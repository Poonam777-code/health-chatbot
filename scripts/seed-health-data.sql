-- Seed data for health features

-- Insert body parts
INSERT INTO body_parts (name, description) VALUES
('Head', 'Head and skull area'),
('Eyes', 'Eye area and vision'),
('Ears', 'Ear area and hearing'),
('Chest', 'Chest and respiratory area'),
('Abdomen', 'Abdominal and digestive area'),
('Arms', 'Arms and upper extremities'),
('Legs', 'Legs and lower extremities'),
('Back', 'Back and spine area')
ON CONFLICT DO NOTHING;

-- Insert prevention categories
INSERT INTO prevention_categories (name, description, icon) VALUES
('Daily Challenges', 'Quick daily health activities', 'Target'),
('Nutrition', 'Healthy eating and diet tips', 'Apple'),
('Exercise', 'Physical activity and fitness', 'Dumbbell'),
('Sleep', 'Sleep hygiene and rest', 'Moon'),
('Hydration', 'Water intake and hydration', 'Droplets'),
('Seasonal', 'Season-specific health tips', 'Sun'),
('Mental Health', 'Mental wellness and stress management', 'Brain'),
('Hygiene', 'Personal hygiene and cleanliness', 'Soap')
ON CONFLICT DO NOTHING;

-- Insert FAQ categories
INSERT INTO faq_categories (name, description) VALUES
('General Health', 'Basic health questions and wellness'),
('Nutrition', 'Diet, food, and nutrition questions'),
('Exercise', 'Physical activity and fitness questions'),
('Mental Health', 'Mental wellness and psychological health'),
('Chronic Conditions', 'Long-term health conditions'),
('Medications', 'Drug interactions and medication questions'),
('Prevention', 'Disease prevention and health maintenance'),
('Emergency Care', 'Urgent health situations and first aid')
ON CONFLICT DO NOTHING;

-- Insert myth categories
INSERT INTO myth_categories (name, description) VALUES
('Nutrition', 'Food and diet related myths'),
('Exercise', 'Fitness and physical activity myths'),
('Medicine', 'Medical treatment and drug myths'),
('Mental Health', 'Mental health and psychology myths'),
('Prevention', 'Disease prevention myths'),
('General Health', 'Common health misconceptions'),
('Alternative Medicine', 'Alternative and complementary medicine myths')
ON CONFLICT DO NOTHING;

-- Insert sample prevention tips
INSERT INTO prevention_tips (title, description, category_id, difficulty, duration, points, effectiveness_rating, seasonal) 
SELECT 
    'Wash Hands Properly',
    'Wash hands for 20 seconds with soap and warm water to prevent infections',
    pc.id,
    'easy',
    '2 minutes',
    10,
    95,
    false
FROM prevention_categories pc WHERE pc.name = 'Daily Challenges'
ON CONFLICT DO NOTHING;

INSERT INTO prevention_tips (title, description, category_id, difficulty, duration, points, effectiveness_rating, media_type) 
SELECT 
    '5-Minute Deep Breathing',
    'Practice mindful breathing to reduce stress and improve focus',
    pc.id,
    'easy',
    '5 minutes',
    15,
    88,
    'animation'
FROM prevention_categories pc WHERE pc.name = 'Mental Health'
ON CONFLICT DO NOTHING;

INSERT INTO prevention_tips (title, description, category_id, difficulty, duration, points, effectiveness_rating) 
SELECT 
    'Eat the Rainbow',
    'Include 5 different colored fruits/vegetables in your meals today',
    pc.id,
    'medium',
    'All day',
    25,
    92
FROM prevention_categories pc WHERE pc.name = 'Nutrition'
ON CONFLICT DO NOTHING;

-- Insert sample FAQs
INSERT INTO health_faqs (question, answer, category_id, language, sources, votes_helpful, trending) 
SELECT 
    'How much water should I drink daily?',
    'The general recommendation is about 8 glasses (64 ounces) of water per day, but individual needs vary based on activity level, climate, and overall health. The Institute of Medicine suggests about 15.5 cups (3.7 liters) for men and 11.5 cups (2.7 liters) for women from all beverages and food.',
    fc.id,
    'en',
    ARRAY['Mayo Clinic', 'Institute of Medicine'],
    245,
    true
FROM faq_categories fc WHERE fc.name = 'Nutrition'
ON CONFLICT DO NOTHING;

INSERT INTO health_faqs (question, answer, category_id, language, sources, votes_helpful, trending) 
SELECT 
    'What are the symptoms of high blood pressure?',
    'High blood pressure often has no symptoms, which is why it''s called the ''silent killer.'' However, some people may experience headaches, shortness of breath, or nosebleeds. Regular monitoring is essential for early detection.',
    fc.id,
    'en',
    ARRAY['American Heart Association', 'CDC'],
    189,
    true
FROM faq_categories fc WHERE fc.name = 'Chronic Conditions'
ON CONFLICT DO NOTHING;

-- Insert sample health myths
INSERT INTO health_myths (statement, is_myth, explanation, risk_level, category_id, difficulty, sources, approved) 
SELECT 
    'You need to drink 8 glasses of water every day to stay healthy',
    true,
    'While staying hydrated is important, the ''8 glasses a day'' rule is not scientifically proven. Water needs vary based on activity level, climate, and individual factors. You can get hydration from food and other beverages too.',
    'low',
    mc.id,
    'easy',
    ARRAY['Mayo Clinic', 'Institute of Medicine'],
    true
FROM myth_categories mc WHERE mc.name = 'Nutrition'
ON CONFLICT DO NOTHING;

INSERT INTO health_myths (statement, is_myth, explanation, risk_level, category_id, difficulty, sources, approved) 
SELECT 
    'Vaccines can cause autism',
    true,
    'This is a dangerous myth that has been thoroughly debunked by numerous large-scale studies. The original study claiming this link was fraudulent and retracted. Vaccines are safe and crucial for public health.',
    'high',
    mc.id,
    'easy',
    ARRAY['CDC', 'WHO', 'AAP'],
    true
FROM myth_categories mc WHERE mc.name = 'Medicine'
ON CONFLICT DO NOTHING;

INSERT INTO health_myths (statement, is_myth, explanation, risk_level, category_id, difficulty, sources, approved) 
SELECT 
    'Regular hand washing can prevent most common infections',
    false,
    'This is TRUE! Proper hand washing with soap for 20 seconds is one of the most effective ways to prevent the spread of infections, including colds, flu, and many other diseases.',
    'low',
    mc.id,
    'easy',
    ARRAY['CDC', 'WHO'],
    true
FROM myth_categories mc WHERE mc.name = 'Prevention'
ON CONFLICT DO NOTHING;
