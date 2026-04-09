import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const recentQueries = await query(`
      SELECT 
        id,
        query_text as query,
        intent,
        confidence_score as confidence,
        language,
        created_at as timestamp,
        CASE 
          WHEN user_satisfaction >= 4 THEN 'positive'
          WHEN user_satisfaction >= 3 THEN 'neutral'
          ELSE 'negative'
        END as feedback
      FROM public.query_analytics
      ORDER BY created_at DESC
      LIMIT 10
    `)

    return NextResponse.json({
      recentQueries: recentQueries.map(q => ({
        id: q.id,
        query: q.query,
        intent: q.intent || 'unknown',
        confidence: parseFloat(q.confidence) || 0.85,
        language: q.language || 'en',
        timestamp: q.timestamp,
        feedback: q.feedback || 'neutral'
      }))
    })
  } catch (error) {
    console.error("Failed to fetch recent queries:", error)
    return NextResponse.json(
      { error: "Failed to fetch recent queries" },
      { status: 500 }
    )
  }
}
