import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export default function AdminLoginPage() {
  const session = getSession();
  if (session) redirect("/admin");

  return <AdminLogin />;
}