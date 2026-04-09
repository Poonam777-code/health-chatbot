import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface SignUpRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: SignUpRequest = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userId = crypto.randomUUID();
    await query(
      `INSERT INTO users (id, email, password_hash, created_at) 
       VALUES ($1, $2, $3, NOW())`,
      [userId, email, passwordHash]
    );

    // Create user profile if the table exists.
    try {
      await query(
        `INSERT INTO profiles (user_id, display_name, created_at) 
         VALUES ($1, $2, NOW())`,
        [userId, email.split("@")[0]]
      );
    } catch (profileError) {
      const message = profileError instanceof Error ? profileError.message : String(profileError);

      if (/relation "profiles" does not exist/i.test(message)) {
        console.warn("Profile insert skipped because profiles table is missing:", message);
      } else if (/column "user_id" does not exist/i.test(message)) {
        console.warn("Trying fallback profile insert using legacy profiles schema...");
        try {
          await query(
            `INSERT INTO profiles (id, display_name, created_at) 
             VALUES ($1, $2, NOW())`,
            [userId, email.split("@")[0]]
          );
        } catch (legacyError) {
          console.warn("Legacy profile insert also failed:", legacyError);
        }
      } else {
        throw profileError;
      }
    }

    const sessionToken = crypto.randomBytes(32).toString("hex");
    await query(
      `INSERT INTO sessions (user_id, token, expires_at, created_at) 
       VALUES ($1, $2, NOW() + INTERVAL '7 days', NOW())`,
      [userId, sessionToken]
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        userId,
      },
      { status: 201 }
    );

    response.cookies.set("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    response.cookies.set("user_id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Sign-up error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create account. Please try again.";
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
