/**
 * DEPRECATED: This file is no longer used.
 * The application has been migrated from Supabase to Neon PostgreSQL via API endpoints.
 * All database operations should go through the API layer (/app/api/*) or directly via @/lib/db.
 * 
 * For legacy reference only.
 */

import { cookies } from "next/headers";

export async function createClient() {
  throw new Error("Supabase server client has been deprecated. Use @/lib/db or API endpoints instead.");
}