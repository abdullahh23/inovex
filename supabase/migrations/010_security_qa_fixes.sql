-- Migration 010: Security & QA Fixes
-- Fixes:
--   1. Atomic increment_profile_counter RPC (replaces TOCTOU read-modify-write)
--   2. WITH CHECK clauses on loads/invoices/user_settings INSERT policies
--   3. Protect manual_loads_used and file_uploads_used from direct reset by users

-- ============================================================
-- FIX 1: Atomic counter increment RPC
-- Accepts a field name and increments it atomically via a single UPDATE
-- Prevents race condition when multiple tabs upload simultaneously
-- ============================================================
CREATE OR REPLACE FUNCTION public.increment_profile_counter(
  p_user_id uuid,
  p_field text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only allow self-increment or service role
  IF auth.uid() IS NOT NULL AND p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized: cannot modify another user''s counter';
  END IF;

  -- Validate field name to prevent SQL injection via dynamic field
  IF p_field NOT IN ('manual_loads_used', 'file_uploads_used', 'uploads_used') THEN
    RAISE EXCEPTION 'Invalid counter field: %', p_field;
  END IF;

  -- Single atomic UPDATE — no read-modify-write race condition
  IF p_field = 'manual_loads_used' THEN
    UPDATE public.profiles SET manual_loads_used = manual_loads_used + 1 WHERE id = p_user_id;
  ELSIF p_field = 'file_uploads_used' THEN
    UPDATE public.profiles SET file_uploads_used = file_uploads_used + 1 WHERE id = p_user_id;
  ELSIF p_field = 'uploads_used' THEN
    UPDATE public.profiles SET uploads_used = uploads_used + 1 WHERE id = p_user_id;
  END IF;
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_profile_counter(uuid, text) TO authenticated;

-- ============================================================
-- FIX 2: Protect _used counters from being reset by users
-- Extend the prevent_role_escalation trigger to block users from
-- directly setting manual_loads_used or file_uploads_used to lower values
-- ============================================================
CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only service role or admin can modify protected columns
  IF NOT public.is_admin() THEN
    -- Revert protected columns to their old values
    NEW.role := OLD.role;
    NEW.status := OLD.status;
    NEW.approved_at := OLD.approved_at;
    NEW.approved_by := OLD.approved_by;
    NEW.monthly_upload_limit := OLD.monthly_upload_limit;
    NEW.uploads_reset_at := OLD.uploads_reset_at;

    -- Protect limit columns
    BEGIN
      NEW.manual_load_limit := OLD.manual_load_limit;
      NEW.file_upload_limit := OLD.file_upload_limit;
    EXCEPTION WHEN undefined_column THEN
      NULL;
    END;

    -- Protect _used counters from being DECREASED by users
    -- (They can only go up via the increment_profile_counter RPC)
    BEGIN
      IF NEW.manual_loads_used < OLD.manual_loads_used THEN
        NEW.manual_loads_used := OLD.manual_loads_used;
      END IF;
      IF NEW.file_uploads_used < OLD.file_uploads_used THEN
        NEW.file_uploads_used := OLD.file_uploads_used;
      END IF;
      IF NEW.uploads_used < OLD.uploads_used THEN
        NEW.uploads_used := OLD.uploads_used;
      END IF;
    EXCEPTION WHEN undefined_column THEN
      NULL;
    END;
  END IF;
  RETURN NEW;
END;
$$;

-- ============================================================
-- FIX 3: Add WITH CHECK to RLS policies for INSERT operations
-- Ensures inserted rows always have user_id = authenticated user
-- ============================================================

-- Loads
DROP POLICY IF EXISTS "Users manage own loads" ON public.loads;
CREATE POLICY "Users manage own loads"
  ON public.loads FOR ALL
  USING (auth.uid() = user_id AND (
    SELECT NOT is_disabled FROM public.profiles WHERE id = auth.uid()
  ))
  WITH CHECK (auth.uid() = user_id);

-- Invoices
DROP POLICY IF EXISTS "Users manage own invoices" ON public.invoices;
CREATE POLICY "Users manage own invoices"
  ON public.invoices FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User settings
DROP POLICY IF EXISTS "Users manage own settings" ON public.user_settings;
CREATE POLICY "Users manage own settings"
  ON public.user_settings FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
