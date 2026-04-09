-- Create additional tables for comprehensive health features

-- Symptoms and body parts tracking
CREATE TABLE IF NOT EXISTS body_parts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS symptoms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    body_part_id UUID REFERENCES body_parts(id),
    severity_level INTEGER DEFAULT 1, -- 1-5 scale
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS symptom_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    selected_symptoms TEXT[] NOT NULL,
    body_part TEXT NOT NULL,
    additional_notes TEXT,
    ai_analysis JSONB, -- Store AI analysis results
    urgency_level TEXT CHECK (urgency_level IN ('low', 'medium', 'high')),
    health_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prevention tips and challenges
CREATE TABLE IF NOT EXISTS prevention_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prevention_tips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES prevention_categories(id),
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    duration TEXT,
    points INTEGER DEFAULT 0,
    effectiveness_rating INTEGER DEFAULT 0, -- 0-100
    media_type TEXT CHECK (media_type IN ('video', 'animation', 'infographic')),
    media_url TEXT,
    seasonal BOOLEAN DEFAULT FALSE,
    location_specific BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_challenges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    tip_id UUID REFERENCES prevention_tips(id),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tip_id)
);

-- Health FAQs system
CREATE TABLE IF NOT EXISTS faq_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS health_faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category_id UUID REFERENCES faq_categories(id),
    language TEXT DEFAULT 'en',
    sources TEXT[] DEFAULT '{}',
    votes_helpful INTEGER DEFAULT 0,
    votes_not_helpful INTEGER DEFAULT 0,
    trending BOOLEAN DEFAULT FALSE,
    verified_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faq_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    faq_id UUID REFERENCES health_faqs(id),
    is_helpful BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, faq_id)
);

-- AI Chat conversations (extending existing messages table)
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    language TEXT DEFAULT 'en',
    total_messages INTEGER DEFAULT 0
);

-- Myth busting system
CREATE TABLE IF NOT EXISTS myth_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS health_myths (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    statement TEXT NOT NULL,
    is_myth BOOLEAN NOT NULL,
    explanation TEXT NOT NULL,
    risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
    category_id UUID REFERENCES myth_categories(id),
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    sources TEXT[] DEFAULT '{}',
    verified_by TEXT,
    submitted_by UUID REFERENCES auth.users(id),
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS myth_quiz_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    myth_id UUID REFERENCES health_myths(id),
    user_answer BOOLEAN NOT NULL,
    is_correct BOOLEAN NOT NULL,
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User gamification and progress tracking
CREATE TABLE IF NOT EXISTS user_health_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    health_score INTEGER DEFAULT 85,
    total_points INTEGER DEFAULT 0,
    quiz_accuracy DECIMAL(5,2) DEFAULT 0.00,
    challenges_completed INTEGER DEFAULT 0,
    myths_busted INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    location TEXT,
    age_range TEXT,
    health_interests TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    achievement_type TEXT NOT NULL,
    achievement_name TEXT NOT NULL,
    description TEXT,
    points_awarded INTEGER DEFAULT 0,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User submitted content for review
CREATE TABLE IF NOT EXISTS user_myth_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    submitted_statement TEXT NOT NULL,
    category TEXT,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    reviewed_by TEXT,
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_symptom_analyses_user_id ON symptom_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_symptom_analyses_created_at ON symptom_analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_completed ON user_challenges(completed);
CREATE INDEX IF NOT EXISTS idx_health_faqs_category ON health_faqs(category_id);
CREATE INDEX IF NOT EXISTS idx_health_faqs_language ON health_faqs(language);
CREATE INDEX IF NOT EXISTS idx_health_faqs_trending ON health_faqs(trending);
CREATE INDEX IF NOT EXISTS idx_health_myths_category ON health_myths(category_id);
CREATE INDEX IF NOT EXISTS idx_health_myths_approved ON health_myths(approved);
CREATE INDEX IF NOT EXISTS idx_myth_quiz_attempts_user_id ON myth_quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_health_profiles_user_id ON user_health_profiles(user_id);
