import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export default function AdminPage() {
  const session = getSession();
  if (!session) redirect("/admin/login");

  return <AdminDashboard />;
}