-- Remove admin approval requirement: new users start as 'approved'
ALTER TABLE public.profiles ALTER COLUMN status SET DEFAULT 'approved';

-- Approve any existing pending users
UPDATE public.profiles SET status = 'approved', approved_at = now() WHERE status = 'pending';
