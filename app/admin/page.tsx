import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = { title: "Панель администратора" };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string }>;
}) {
  const { auth } = await searchParams;
  const isAuthed = auth === process.env.ADMIN_PASSWORD;

  if (!isAuthed) {
    redirect("/admin/login");
  }

  return <AdminDashboard authToken={auth!} />;
}
