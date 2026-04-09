// app/page.tsx
import { redirect } from "next/navigation";
import { query } from "@/lib/db"; // your Neon DB helper
import { cookies } from "next/headers";

export default async function HomePage() {
  // 1️⃣ Get the user_id from cookies
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    // No user logged in → redirect to login
    redirect("/auth/login");
  }

  // 2️⃣ Fetch the user from Neon
  const users = await query("SELECT * FROM users WHERE id = $1", [userId]);
  const user = users[0];

  if (!user) {
    // User not found → redirect to login
    redirect("/auth/login");
  }

  // 3️⃣ User exists → redirect to chat page
  redirect("/chat");
}