import { NextResponse, type NextRequest } from "next/server";
import { query } from "../db"; // path to your lib/db.ts

export async function updateSession(request: NextRequest) {
  try {
    // Example: get user id from a cookie or header (adjust to your project)
    const userId = request.cookies.get("user_id")?.value;

    if (!userId) {
      // No user, continue request without session
      return NextResponse.next({ request });
    }

    // Check if user exists in Neon database
    const users = await query("SELECT * FROM users WHERE id = $1", [userId]);

    if (!users.length) {
      // User not found, continue without session
      return NextResponse.next({ request });
    }

    // Attach user info to request headers for downstream use
    const response = NextResponse.next({
      request,
    });
    response.headers.set("x-user-id", userId);

    return response;
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.next({ request });
  }
}