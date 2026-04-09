import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    let bodyParts: any[] = []
    let symptoms: any[] = []

    // Try fetching body parts safely
    try {
      bodyParts = await query(
        `SELECT * FROM public.health_topics LIMIT 9`
      )
    } catch (err) {
      console.warn("health_topics table not found (bodyParts)")
    }

    // Try fetching symptoms safely
    try {
      symptoms = await query(
        `SELECT DISTINCT category FROM public.health_topics`
      )
    } catch (err) {
      console.warn("health_topics table not found (symptoms)")
    }

    return NextResponse.json({
      bodyParts,
      symptoms,
      healthProfile: null,
    })

  } catch (error) {
    console.error("Error fetching health data:", error)

    return NextResponse.json(
      { error: "Failed to fetch health data" },
      { status: 500 }
    )
  }
}