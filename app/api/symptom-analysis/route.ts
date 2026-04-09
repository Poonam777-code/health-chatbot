import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      body_part,
      selected_symptoms,
      urgency_level,
      health_score,
      ai_analysis,
      additional_notes,
    } = body

    // Insert symptom analysis into database
    const result = await query(
      `INSERT INTO public.symptom_analyses 
       (body_part, selected_symptoms, urgency_level, health_score, ai_analysis, additional_notes) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id`,
      [
        body_part,
        JSON.stringify(selected_symptoms),
        urgency_level,
        health_score,
        JSON.stringify(ai_analysis),
        additional_notes,
      ]
    )

    return NextResponse.json({ id: result[0]?.id }, { status: 201 })
  } catch (error) {
    console.error("Error saving symptom analysis:", error)
    return NextResponse.json(
      { error: "Failed to save symptom analysis" },
      { status: 500 }
    )
  }
}
