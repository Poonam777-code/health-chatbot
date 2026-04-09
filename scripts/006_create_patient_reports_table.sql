-- Create a table for patient reports used by the admin dashboard

CREATE TABLE IF NOT EXISTS public.patient_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  report_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  report_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Ready',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.patient_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view patient reports" ON public.patient_reports
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert patient reports" ON public.patient_reports
  FOR INSERT TO authenticated WITH CHECK (true);

INSERT INTO public.patient_reports (id, patient_name, report_type, summary, report_date, status)
VALUES
  ('a1f7c2cc-7c00-4d9f-aa8c-1eea79bcb6f0', 'Aarti Patel', 'General Checkup', 'Routine health report with vitals and recommendations.', '2026-04-07', 'Ready'),
  ('c4dd1b2f-3f9b-4e8b-a40c-2bd24d2f8f9a', 'Rahul Deshmukh', 'Heart Health', 'Cardiac evaluation and blood pressure review.', '2026-04-06', 'Ready'),
  ('d9b2af04-379b-4d1b-bf6d-58f4e2898e02', 'Nisha Sharma', 'Diabetes Follow-up', 'Blood sugar monitoring and diet recommendation.', '2026-04-05', 'Ready')
ON CONFLICT (id) DO NOTHING;
