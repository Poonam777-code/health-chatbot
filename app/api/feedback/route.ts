import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db"; // Neon DB helper
import { cookies } from "next/headers";

interface FeedbackRequest {
  message_id: string;
  feedback_type: "thumbs_up" | "thumbs_down";
  feedback_text?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Get user_id from cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Parse request body
    const { message_id, feedback_type, feedback_text }: FeedbackRequest = await request.json();

    if (!message_id || !feedback_type) {
      return NextResponse.json({ error: "Message ID and feedback type are required" }, { status: 400 });
    }

    // 3️⃣ Store feedback in Neon
    const feedbackRows = await query(
      `INSERT INTO message_feedback(message_id, user_id, feedback_type, feedback_text)
       VALUES($1, $2, $3, $4) RETURNING id, created_at`,
      [message_id, userId, feedback_type, feedback_text || null]
    );

    const feedback = feedbackRows[0];

    if (!feedback) {
      return NextResponse.json({ error: "Failed to store feedback" }, { status: 500 });
    }

    // 4️⃣ Update analytics with satisfaction score
    const satisfactionScore = feedback_type === "thumbs_up" ? 5.0 : 1.0;

    await query(
      `UPDATE query_analytics
       SET user_satisfaction = $1
       WHERE created_at = $2`,
      [satisfactionScore, feedback.created_at] // simplistic match, adjust if needed
    );

    // 5️⃣ Return response
    return NextResponse.json({
      success: true,
      feedback_id: feedback.id,
    });
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}