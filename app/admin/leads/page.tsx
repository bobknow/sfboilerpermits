import LeadsCenter from "@/components/admin/LeadsCenter";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Lead } from "@/types/lead";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);

    return (
      <main className="px-6 py-10">
        <h1 className="text-3xl font-black">
          Leads
        </h1>

        <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
          Unable to load leads.
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <header className="border-b border-slate-800 pb-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            CRM
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Leads
          </h1>

          <p className="mt-2 text-slate-400">
            Track and convert incoming opportunities.
          </p>

        </header>

        <LeadsCenter
          leads={(data ?? []) as Lead[]}
        />

      </div>
    </main>
  );
}