-- Create a table for patient report download tracking

CREATE TABLE IF NOT EXISTS public.report_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  report_type TEXT,
  user_email TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.report_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert report downloads" ON public.report_downloads
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can view report downloads" ON public.report_downloads
  FOR SELECT TO authenticated USING (true);
