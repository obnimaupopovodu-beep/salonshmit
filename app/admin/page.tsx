import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = { title: "Панель администратора" };

export default function AdminPage({
  searchParams,
}: {
  searchParams: { auth?: string };
}) {
  const isAuthed = searchParams.auth === process.env.ADMIN_PASSWORD;

  if (!isAuthed) {
    redirect("/admin/login");
  }

  return <AdminDashboard authToken={searchParams.auth!} />;
}
