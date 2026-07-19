import type { Lead } from "@/types/lead";

type StatsCardsProps = {
  leads: Lead[];
};

export default function StatsCards({ leads }: StatsCardsProps) {
  const newLeadCount = leads.filter((lead) => lead.status === "New").length;

  const convertedLeadCount = leads.filter(
    (lead) => lead.status === "Converted",
  ).length;

  const totalBoilers = leads.reduce(
    (total, lead) => total + (lead.boilers ?? 0),
    0,
  );

  return (
    <section className="grid gap-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm font-semibold text-slate-400">Total Leads</p>
        <p className="mt-2 text-4xl font-black text-white">{leads.length}</p>
      </div>

      <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-6">
        <p className="text-sm font-semibold text-emerald-300">New Leads</p>
        <p className="mt-2 text-4xl font-black text-emerald-400">
          {newLeadCount}
        </p>
      </div>

      <div className="rounded-2xl border border-fuchsia-800 bg-fuchsia-950/30 p-6">
        <p className="text-sm font-semibold text-fuchsia-300">Converted</p>
        <p className="mt-2 text-4xl font-black text-fuchsia-300">
          {convertedLeadCount}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm font-semibold text-slate-400">
          Boiler Requests
        </p>
        <p className="mt-2 text-4xl font-black text-white">{totalBoilers}</p>
      </div>
    </section>
  );
}