-- Add saved_carriers JSONB column to user_settings
ALTER TABLE public.user_settings
  ADD COLUMN IF NOT EXISTS saved_carriers jsonb DEFAULT '[]'::jsonb;
