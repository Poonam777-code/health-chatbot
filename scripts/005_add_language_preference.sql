-- Migration: Add preferred_language column to users table

-- Add preferred_language column to users table if it doesn't exist
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en';

-- Create an index on preferred_language for better query performance
CREATE INDEX IF NOT EXISTS idx_users_preferred_language ON public.users(preferred_language);

-- Update existing users to have default language 'en'
UPDATE public.users SET preferred_language = 'en' WHERE preferred_language IS NULL;
