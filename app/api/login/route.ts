import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: LoginRequest = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const users = await query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token (simple session token - consider JWT for production)
    const sessionToken = crypto.randomBytes(32).toString("hex");

    // Store session
    await query(
      `INSERT INTO sessions (user_id, token, expires_at, created_at) 
       VALUES ($1, $2, NOW() + INTERVAL '7 days', NOW())`,
      [user.id, sessionToken]
    );

    // Set secure cookies
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        userId: user.id,
        sessionToken,
      },
      { status: 200 }
    );

    response.cookies.set("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    response.cookies.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error instanceof Error ? error.message : "Login failed. Please try again.";
    const isMissingUsersTable = /relation \"users\" does not exist/i.test(errorMessage);
    const dbHelpMessage = isMissingUsersTable
      ? "Database schema not initialized: run scripts/004_create_auth_tables.sql against your Neon database."
      : errorMessage;

    return NextResponse.json(
      { error: dbHelpMessage },
      { status: 500 }
    );
  }
}
