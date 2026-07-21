import LeadsDashboard from "@/components/admin/LeadsDashboard";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { Lead } from "@/types/lead";
import { notFound } from "next/navigation";
import NewServiceRequestButton from "@/components/admin/NewServiceRequestButton";

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
      <main className="px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">Dashboard</h1>

          <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
            Leads could not be loaded. Check the terminal for the Supabase error.
          </div>
        </div>
      </main>
    );
  }

  const leads = (data ?? []) as Lead[];

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <NewServiceRequestButton />
        </div>
        <header className="flex flex-col gap-6 border-b border-slate-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            New Leads
          </h1>

          <p className="mt-2 text-slate-400">
            Fresh permit requests that need your attention.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <a
            href="/admin/customers"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500"
          >
            <p className="text-sm text-slate-400">Customers</p>

            <h2 className="mt-2 text-2xl font-black">Manage Customers</h2>

            <p className="mt-3 text-slate-400">
              Contacts, organizations, and property owners.
            </p>
          </a>

          <a
            href="/admin/properties"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500"
          >
            <p className="text-sm text-slate-400">Properties</p>

            <h2 className="mt-2 text-2xl font-black">Buildings</h2>

            <p className="mt-3 text-slate-400">
              Equipment, permits, and monitoring.
            </p>
          </a>

          <a
            href="/admin/equipment"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500"
          >
            <p className="text-sm text-slate-400">Equipment</p>

            <h2 className="mt-2 text-2xl font-black">Boilers</h2>

            <p className="mt-3 text-slate-400">
              View every monitored asset.
            </p>
          </a>

          <a
            href="/admin/boilerwatch"
            className="rounded-2xl border border-emerald-700 bg-emerald-950/30 p-6 transition hover:bg-emerald-950/50"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-400">
              BoilerWatch
            </p>

            <h2 className="mt-2 text-2xl font-black">Live Monitoring</h2>

            <p className="mt-3 text-slate-300">
              Devices, telemetry, and alerts.
            </p>
          </a>
        </section>

        <LeadsDashboard leads={leads} />
      </div>
    </main>
  );
}