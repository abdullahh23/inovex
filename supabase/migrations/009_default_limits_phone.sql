-- Migration 009: Update default limits + add phone column
-- Default: 20 file uploads, 10 manual loads for new users
-- Add phone number field to profiles

-- Update defaults for new users
ALTER TABLE profiles ALTER COLUMN file_upload_limit SET DEFAULT 20;
ALTER TABLE profiles ALTER COLUMN manual_load_limit SET DEFAULT 15;

-- Add phone number column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text;

-- Update existing users who still have old defaults (2) to new defaults
UPDATE profiles SET file_upload_limit = 20 WHERE file_upload_limit = 2 AND role != 'admin';
UPDATE profiles SET manual_load_limit = 15 WHERE manual_load_limit = 2 AND role != 'admin';

-- Update signup trigger to capture phone number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  INSERT INTO public.user_settings (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;
