-- Migration 006: Split upload limits into manual vs file limits
-- Add separate limit columns for manual loads and file uploads
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS manual_load_limit int NOT NULL DEFAULT 2;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS file_upload_limit int NOT NULL DEFAULT 2;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS manual_loads_used int NOT NULL DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS file_uploads_used int NOT NULL DEFAULT 0;

-- Migrate existing data: copy old limit to both new columns
UPDATE profiles
SET manual_load_limit = COALESCE(monthly_upload_limit, 2),
    file_upload_limit = COALESCE(monthly_upload_limit, 2),
    manual_loads_used = 0,
    file_uploads_used = COALESCE(uploads_used, 0);
