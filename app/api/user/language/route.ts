import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db"; // Neon DB helper
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Get logged-in user from cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Fetch user's preferred language
    const result = await query(
      "SELECT preferred_language FROM users WHERE id = $1",
      [userId]
    );

    if (result.length === 0) {
      return NextResponse.json({ preferred_language: "en" });
    }

    // 3️⃣ Return user's language preference
    return NextResponse.json({ preferred_language: result[0].preferred_language || "en" });
  } catch (error) {
    console.error("Error in language fetch:", error);
    return NextResponse.json({ preferred_language: "en" });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Get logged-in user from cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Parse request body
    const { language } = await request.json();
    if (!language) {
      return NextResponse.json({ error: "Language is required" }, { status: 400 });
    }

    // 3️⃣ Update user's preferred language in Neon
    await query(
      "UPDATE users SET preferred_language = $1 WHERE id = $2",
      [language, userId]
    );

    // 4️⃣ Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in language update:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}