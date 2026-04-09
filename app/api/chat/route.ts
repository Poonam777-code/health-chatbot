import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db"; // Neon DB helper
import { cookies } from "next/headers";

interface ChatMessage {
  content: string;
  conversation_id?: string;
}

interface DetectedIntent {
  intent: string
  confidence: number
}

// Health knowledge base for bot responses
const healthKnowledgeBase: Record<string, string> = {
  symptom_inquiry: "I understand you're experiencing symptoms. Please describe your symptoms in detail, including which body part is affected, how long you've had them, and their severity. Remember, I'm here to provide information only, not a diagnosis.",
  prevention_inquiry: "Good question about prevention! General health prevention includes: staying hydrated, getting adequate sleep (7-9 hours), regular exercise, balanced diet, stress management, and practicing good hygiene. For specific health concerns, please consult a healthcare provider.",
  vaccine_inquiry: "Vaccines are an important part of public health. They help protect you and your community from serious diseases. If you have specific questions about vaccine schedules or safety, I recommend consulting with your healthcare provider.",
  general_health: "I'm here to help with health-related questions and provide general information. However, always consult a healthcare professional for medical advice, diagnosis, or treatment.",
  medication_inquiry: "Medication questions are important and should always be discussed with a pharmacist or doctor. I cannot provide medication recommendations without medical consultation.",
  mental_health: "Mental health is just as important as physical health. If you're experiencing mental health concerns, please reach out to a mental health professional or counselor.",
  appointment_request: "For scheduling appointments, please contact your healthcare provider directly or visit their website.",
}

// Detect user intent from message
function detectIntent(content: string): DetectedIntent {
  const lowerContent = content.toLowerCase()
  
  const intents = [
    { keywords: ["symptom", "pain", "ache", "feel", "hurt"], intent: "symptom_inquiry", weight: 3 },
    { keywords: ["prevent", "prevention", "healthy", "health", "stay healthy"], intent: "prevention_inquiry", weight: 2 },
    { keywords: ["vaccine", "vaccination", "immunization"], intent: "vaccine_inquiry", weight: 3 },
    { keywords: ["medicine", "drug", "medication", "prescription"], intent: "medication_inquiry", weight: 3 },
    { keywords: ["mental", "depression", "anxiety", "stress", "mood"], intent: "mental_health", weight: 2 },
    { keywords: ["appointment", "doctor", "visit", "appointment"], intent: "appointment_request", weight: 2 },
  ]

  let bestMatch: DetectedIntent = { intent: "general_health", confidence: 0.5 }

  for (const intentEntry of intents) {
    const matchCount = intentEntry.keywords.filter(keyword => lowerContent.includes(keyword)).length
    const confidence = Math.min(matchCount * 0.3, 0.95)
    
    if (confidence > bestMatch.confidence) {
      bestMatch = { intent: intentEntry.intent, confidence }
    }
  }

  return bestMatch
}

// Generate health-aware bot response
function generateHealthResponse(content: string, detectedIntent: DetectedIntent): string {
  const baseResponse = healthKnowledgeBase[detectedIntent.intent] || healthKnowledgeBase.general_health
  
  // Add context-aware follow-up
  const followUp = "Is there anything specific you'd like to know more about?"
  
  return `${baseResponse}\n\n${followUp}`
}

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Get user_id from cookies
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Fetch user from Neon
    const users = await query("SELECT * FROM users WHERE id = $1", [userId]);
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3️⃣ Parse user message
    const { content, conversation_id }: ChatMessage = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    // 4️⃣ Detect intent & generate bot response
    const detectedIntent = detectIntent(content);
    const botResponse = generateHealthResponse(content, detectedIntent);

    let convId = conversation_id;

    // 5️⃣ Create new conversation if needed
    if (!convId) {
      const newConv = await query(
        "INSERT INTO conversations(user_id, title) VALUES($1, $2) RETURNING id",
        [user.id, content.substring(0, 50) + (content.length > 50 ? "..." : "")]
      );
      convId = newConv[0].id;
    }

    // 6️⃣ Store user message
    await query(
      "INSERT INTO messages(conversation_id, user_id, content, message_type) VALUES($1, $2, $3, $4)",
      [convId, user.id, content.trim(), "user"]
    );

    // 7️⃣ Store bot response
    const botMsg = await query(
      "INSERT INTO messages(conversation_id, user_id, content, message_type, intent_detected, confidence_score) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, created_at",
      [convId, user.id, botResponse, "bot", detectedIntent.intent, detectedIntent.confidence]
    );

    // 8️⃣ Store analytics
    await query(
      "INSERT INTO query_analytics(query_text, intent, topic_category, language, response_time_ms, user_satisfaction) VALUES($1, $2, $3, $4, $5, $6)",
      [
        content.trim(),
        detectedIntent.intent,
        detectedIntent.intent.split("_")[0],
        "en",
        1200, // simulated response time
        null, // satisfaction
      ]
    );

    // 9️⃣ Return bot message & conversation id
    return NextResponse.json({
      message: {
        id: botMsg[0].id,
        content: botResponse,
        message_type: "bot",
        intent_detected: detectedIntent.intent,
        confidence_score: detectedIntent.confidence,
        created_at: botMsg[0].created_at,
      },
      conversation_id: convId,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}