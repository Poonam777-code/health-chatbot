-- Seed data for health topics and myth-busting content

-- Insert common health topics
INSERT INTO public.health_topics (name, category, description, keywords) VALUES
('COVID-19', 'Infectious Diseases', 'Information about COVID-19 symptoms, prevention, and treatment', ARRAY['covid', 'coronavirus', 'pandemic', 'symptoms', 'vaccine']),
('Diabetes', 'Chronic Diseases', 'Type 1 and Type 2 diabetes management and prevention', ARRAY['diabetes', 'blood sugar', 'insulin', 'glucose']),
('Hypertension', 'Cardiovascular', 'High blood pressure causes, symptoms, and management', ARRAY['blood pressure', 'hypertension', 'heart', 'cardiovascular']),
('Mental Health', 'Mental Wellness', 'Depression, anxiety, and mental health resources', ARRAY['depression', 'anxiety', 'mental health', 'stress', 'therapy']),
('Vaccination', 'Prevention', 'Vaccine schedules and immunization information', ARRAY['vaccine', 'immunization', 'shots', 'prevention']),
('Nutrition', 'Lifestyle', 'Healthy eating habits and nutritional guidance', ARRAY['nutrition', 'diet', 'healthy eating', 'vitamins']),
('Exercise', 'Lifestyle', 'Physical activity recommendations and benefits', ARRAY['exercise', 'fitness', 'physical activity', 'workout']),
('Maternal Health', 'Women''s Health', 'Pregnancy, prenatal care, and maternal wellness', ARRAY['pregnancy', 'prenatal', 'maternal', 'baby']),
('Child Health', 'Pediatrics', 'Child development, vaccination schedules, and pediatric care', ARRAY['children', 'pediatric', 'kids', 'development']),
('Infectious Diseases', 'Infectious Diseases', 'Prevention and treatment of communicable diseases', ARRAY['infection', 'contagious', 'bacteria', 'virus']);

-- Insert myth-busting content
INSERT INTO public.myth_busting (myth_text, fact_text, source_url, category, verified_by) VALUES
('Vaccines cause autism', 'Multiple large-scale studies have found no link between vaccines and autism. Vaccines are safe and effective at preventing serious diseases.', 'https://www.cdc.gov/vaccinesafety/concerns/autism.html', 'Vaccination', 'CDC'),
('COVID-19 was created in a laboratory', 'Scientific evidence strongly suggests that COVID-19 evolved naturally. The virus shows natural evolutionary patterns consistent with zoonotic transmission.', 'https://www.who.int/news-room/feature-stories/detail/how-who-is-working-to-track-down-the-origins-of-the-covid-19-virus', 'COVID-19', 'WHO'),
('Natural immunity is better than vaccine immunity', 'While natural infection can provide immunity, vaccination is safer and more predictable. Vaccines provide protection without the risks of severe illness.', 'https://www.cdc.gov/coronavirus/2019-ncov/science/science-briefs/vaccine-induced-immunity.html', 'Vaccination', 'CDC'),
('Antibiotics work against viral infections', 'Antibiotics only work against bacterial infections, not viral infections like the common cold or flu. Misuse of antibiotics can lead to antibiotic resistance.', 'https://www.who.int/news-room/fact-sheets/detail/antibiotic-resistance', 'Infectious Diseases', 'WHO'),
('You need to drink 8 glasses of water per day', 'Water needs vary by individual, activity level, and climate. Most people get adequate hydration from food and beverages throughout the day.', 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256', 'Nutrition', 'Mayo Clinic'),
('Mental health problems are a sign of weakness', 'Mental health conditions are medical conditions that can affect anyone. They are not a sign of personal weakness and are treatable with proper care.', 'https://www.nimh.nih.gov/health/topics/mental-health-myths-and-facts', 'Mental Health', 'NIMH');
