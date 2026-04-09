-- Migration: Create authentication tables for Neon PostgreSQL
-- This migration sets up user management without Supabase auth

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table for session management
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create or update profiles table to reference users instead of auth.users
-- First, drop existing RLS policies if they exist
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Drop existing profiles table if it exists and references auth.users
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create new profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  display_name TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON public.sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON public.sessions(expires_at);

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM public.sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Update conversations table to reference users table instead of auth.users
DO $$
BEGIN
  -- Check if user_id column exists in conversations
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='conversations' AND column_name='user_id'
  ) THEN
    -- Drop the foreign key constraint if it exists
    ALTER TABLE public.conversations 
    DROP CONSTRAINT IF EXISTS conversations_user_id_fkey;
    
    -- Add the new foreign key
    ALTER TABLE public.conversations
    ADD CONSTRAINT conversations_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Update messages table to reference users table instead of auth.users
DO $$
BEGIN
  -- Drop existing foreign key on user_id if it exists
  ALTER TABLE public.messages 
  DROP CONSTRAINT IF EXISTS messages_user_id_fkey;
  
  -- Add the new foreign key
  ALTER TABLE public.messages
  ADD CONSTRAINT messages_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Update other tables similarly
DO $$
BEGIN
  ALTER TABLE public.message_feedback 
  DROP CONSTRAINT IF EXISTS message_feedback_user_id_fkey;
  
  ALTER TABLE public.message_feedback
  ADD CONSTRAINT message_feedback_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Enable Row Level Security on new tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own user record" ON public.users
  FOR SELECT USING (id::text = current_setting('app.current_user_id', true)::text);

CREATE POLICY "Users can update their own user record" ON public.users
  FOR UPDATE USING (id::text = current_setting('app.current_user_id', true)::text);

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id::text = current_setting('app.current_user_id', true)::text);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id::text = current_setting('app.current_user_id', true)::text);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id::text = current_setting('app.current_user_id', true)::text);

-- Create RLS policies for sessions table
CREATE POLICY "Users can view their own sessions" ON public.sessions
  FOR SELECT USING (user_id::text = current_setting('app.current_user_id', true)::text);

CREATE POLICY "Users can delete their own sessions" ON public.sessions
  FOR DELETE USING (user_id::text = current_setting('app.current_user_id', true)::text);
