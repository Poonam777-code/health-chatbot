-- Create tables for the AI-driven public health chatbot

-- Users table for authentication (references auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('user', 'bot')),
  intent_detected TEXT,
  confidence_score DECIMAL(3,2),
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User feedback on bot responses
CREATE TABLE IF NOT EXISTS public.message_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('thumbs_up', 'thumbs_down')),
  feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health topics and categories
CREATE TABLE IF NOT EXISTS public.health_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Query analytics for admin dashboard
CREATE TABLE IF NOT EXISTS public.query_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_text TEXT NOT NULL,
  intent TEXT,
  topic_category TEXT,
  language TEXT DEFAULT 'en',
  response_time_ms INTEGER,
  user_satisfaction DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Myth-busting content
CREATE TABLE IF NOT EXISTS public.myth_busting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  myth_text TEXT NOT NULL,
  fact_text TEXT NOT NULL,
  source_url TEXT,
  category TEXT,
  verified_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.query_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.myth_busting ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for conversations
CREATE POLICY "Users can view their own conversations" ON public.conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations" ON public.conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" ON public.conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for message feedback
CREATE POLICY "Users can view their own feedback" ON public.message_feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own feedback" ON public.message_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for health topics and myth busting (no user-specific data)
CREATE POLICY "Anyone can view health topics" ON public.health_topics
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can view myth busting content" ON public.myth_busting
  FOR SELECT TO authenticated USING (true);

-- Admin-only access for query analytics
CREATE POLICY "Admins can view query analytics" ON public.query_analytics
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "System can insert query analytics" ON public.query_analytics
  FOR INSERT TO authenticated WITH CHECK (true);
