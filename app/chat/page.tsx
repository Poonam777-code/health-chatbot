import { redirect } from "next/navigation";
import { query } from "@/lib/db"; // Neon DB helper
import { cookies } from "next/headers";
import HealthDashboard from "@/components/health-dashboard";

export default async function ChatPage() {
  // 1️⃣ Get user_id from cookies
  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  // 2️⃣ Fetch user from Neon
  const users = await query("SELECT * FROM users WHERE id = $1", [userId]);
  const user = users[0];

  if (!user) {
    redirect("/auth/login");
  }

  // 3️⃣ Render the dashboard page
  return (
    <div className="min-h-screen bg-background">
      <HealthDashboard user={user} />
    </div>
  );
}