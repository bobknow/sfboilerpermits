import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}