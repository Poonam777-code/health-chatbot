/**
 * DEPRECATED: This file is no longer used.
 * The application has been migrated from Supabase to Neon PostgreSQL via API endpoints.
 * All database operations should go through the API layer (/app/api/*) or directly via @/lib/db.
 * 
 * For legacy reference only.
 */

export function createClient() {
  throw new Error("Supabase client has been deprecated. Use @/lib/db or API endpoints instead.");
}