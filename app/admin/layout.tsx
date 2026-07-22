import AdminSidebar from "@/components/admin/AdminSidebar";
import QuickCreateButton from "@/components/admin/QuickCreateButton";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-950 text-white lg:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-40 flex justify-end border-b border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur lg:px-10">
          <QuickCreateButton />
        </div>

        {children}
      </div>
    </div>
  );
}