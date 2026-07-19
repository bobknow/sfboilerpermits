import LeadsDashboard from "@/components/admin/LeadsDashboard";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Lead } from "@/types/lead";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(
      `
        id,
        created_at,
        name,
        phone,
        email,
        address,
        boilers,
        request_type,
        message,
        status
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin leads error:", error);

    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">Lead Dashboard</h1>

          <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
            Leads could not be loaded. Check the terminal for the Supabase error.
          </div>
        </div>
      </main>
    );
  }

  const leads = (data ?? []) as Lead[];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-slate-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
              BK3 Platform
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight">
              SF Boiler Permits
            </h1>

            <p className="mt-2 text-slate-400">
              Incoming permit requests and customer leads
            </p>
          </div>

          <a
            href="/"
            className="w-fit rounded-lg border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-400"
          >
            View Website
          </a>
        </header>

        <LeadsDashboard leads={leads} />
      </div>
    </main>
  );
}