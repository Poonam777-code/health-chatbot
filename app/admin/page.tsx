import { redirect } from "next/navigation"
import { query } from "@/lib/db"
import { cookies } from "next/headers"
import AdminDashboard from "@/components/admin-dashboard"

export default async function HomePage() {
  // 1️⃣ Get user_id from cookies
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    // No user logged in → redirect to login
    redirect("/auth/login");
  }

  // 2️⃣ Fetch user from Neon
  const users = await query("SELECT * FROM users WHERE id = $1", [userId]);
  const user = users[0];

  if (!user) {
    // User not found → redirect to login
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminDashboard user={user}  />
    </div>
  );
} 