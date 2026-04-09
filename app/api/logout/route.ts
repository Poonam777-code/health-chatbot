import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("sessionToken")?.value;

    if (sessionToken) {
      // Delete session from database
      await query("DELETE FROM sessions WHERE token = $1", [sessionToken]);
    }

    // Clear cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 }
    );

    response.cookies.set("sessionToken", "", {
      httpOnly: true,
      maxAge: 0,
    });

    response.cookies.set("user_id", "", {
      httpOnly: true,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
