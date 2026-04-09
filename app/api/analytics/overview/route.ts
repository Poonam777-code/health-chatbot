import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    // Get query volume and language data (last 7 days)
    const queryVolumeData = await query(`
      SELECT 
        TO_CHAR(created_at, 'Dy') as name,
        COUNT(*) as queries,
        AVG(user_satisfaction) as satisfaction
      FROM public.query_analytics
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY TO_CHAR(created_at, 'Dy')
      ORDER BY created_at
    `)

    // Get language distribution
    const languageData = await query(`
      SELECT 
        COALESCE(language, 'en') as name,
        COUNT(*) as queries,
        ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 0) as percentage
      FROM public.query_analytics
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY language
      ORDER BY queries DESC
    `)

    // Get topic distribution
    const topicData = await query(`
      SELECT 
        COALESCE(topic_category, 'Other') as name,
        COUNT(*) as value
      FROM public.query_analytics
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY topic_category
      ORDER BY value DESC
      LIMIT 5
    `)

    // Get total metrics
    const metrics = await query(`
      SELECT 
        COUNT(*) as total_queries,
        AVG(user_satisfaction) as avg_satisfaction,
        AVG(response_time_ms) as avg_response_time
      FROM public.query_analytics
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `)

    return NextResponse.json({
      queryVolumeData: queryVolumeData.map(d => ({
        name: d.name,
        queries: parseInt(d.queries),
        satisfaction: parseFloat(d.satisfaction || 4.2)
      })),
      languageData: languageData.map(d => ({
        name: d.name,
        queries: parseInt(d.queries),
        percentage: parseInt(d.percentage)
      })),
      topicData: topicData.map((d, i) => ({
        name: d.name,
        value: parseInt(d.value),
        color: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][i] || "#6B7280"
      })),
      metrics: metrics[0] ? {
        totalQueries: parseInt(metrics[0].total_queries),
        avgSatisfaction: parseFloat(metrics[0].avg_satisfaction || 4.2),
        avgResponseTime: parseInt(metrics[0].avg_response_time || 1200)
      } : { totalQueries: 0, avgSatisfaction: 0, avgResponseTime: 0 }
    })
  } catch (error) {
    console.error("Failed to fetch analytics data:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    )
  }
}
