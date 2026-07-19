"use client";

import { useMemo, useState } from "react";

type Lead = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  boilers: number | null;
  request_type: string | null;
  message: string | null;
  status: string;
};

type LeadsDashboardProps = {
  leads: Lead[];
};

const statuses = ["All", "New", "Contacted", "Scheduled", "Complete", "Lost"];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function statusClasses(status: string) {
  switch (status) {
    case "New":
      return "bg-emerald-400/10 text-emerald-400";
    case "Contacted":
      return "bg-amber-400/10 text-amber-300";
    case "Scheduled":
      return "bg-sky-400/10 text-sky-300";
    case "Complete":
      return "bg-violet-400/10 text-violet-300";
    case "Lost":
      return "bg-red-400/10 text-red-300";
    default:
      return "bg-slate-700 text-slate-200";
  }
}

export default function LeadsDashboard({ leads }: LeadsDashboardProps) {
  const [localLeads, setLocalLeads] = useState(leads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingLeadId, setUpdatingLeadId] = useState<number | null>(null);
  const [updateError, setUpdateError] = useState("");

  async function updateLeadStatus(leadId: number, status: string) {
    setUpdatingLeadId(leadId);
    setUpdateError("");

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update lead.");
      }

      setLocalLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status } : lead,
        ),
      );
    } catch (error) {
      setUpdateError(
        error instanceof Error ? error.message : "Unable to update lead.",
      );
    } finally {
      setUpdatingLeadId(null);
    }
  }

  const filteredLeads = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return localLeads.filter((lead) => {
      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        lead.name.toLowerCase().includes(normalizedQuery) ||
        lead.address.toLowerCase().includes(normalizedQuery) ||
        lead.phone.toLowerCase().includes(normalizedQuery) ||
        lead.email.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [localLeads, query, statusFilter]);

  const newLeadCount = localLeads.filter(
    (lead) => lead.status === "New",
  ).length;

  const totalBoilers = localLeads.reduce(
    (total, lead) => total + (lead.boilers ?? 0),
    0,
  );

  return (
    <>
      <section className="grid gap-4 py-8 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold text-slate-400">Total Leads</p>
          <p className="mt-2 text-4xl font-black">{localLeads.length}</p>
        </div>

        <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-6">
          <p className="text-sm font-semibold text-emerald-300">New Leads</p>
          <p className="mt-2 text-4xl font-black text-emerald-400">
            {newLeadCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold text-slate-400">
            Boiler Requests
          </p>
          <p className="mt-2 text-4xl font-black">{totalBoilers}</p>
        </div>
      </section>

      <section>
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, address, phone, or email"
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />

          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                  statusFilter === status
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-emerald-500 hover:text-emerald-400"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {updateError && (
          <div className="mb-5 rounded-xl border border-red-800 bg-red-950/50 px-5 py-4 text-sm font-semibold text-red-200">
            {updateError}
          </div>
        )}

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black">Recent Leads</h2>

          <span className="text-sm text-slate-400">
            {filteredLeads.length} result
            {filteredLeads.length === 1 ? "" : "s"}
          </span>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
            <p className="text-xl font-bold">No matching leads</p>
            <p className="mt-2 text-slate-400">
              Try a different search or status filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black">{lead.name}</h3>

                      <select
                        value={lead.status}
                        disabled={updatingLeadId === lead.id}
                        onChange={(event) =>
                          updateLeadStatus(lead.id, event.target.value)
                        }
                        aria-label={`Update status for ${lead.name}`}
                        className={`rounded-full border border-transparent px-3 py-1 text-xs font-bold uppercase tracking-wide outline-none transition disabled:cursor-wait disabled:opacity-60 ${statusClasses(
                          lead.status,
                        )}`}
                      >
                        {statuses
                          .filter((status) => status !== "All")
                          .map((status) => (
                            <option
                              key={status}
                              value={status}
                              className="bg-slate-900"
                            >
                              {status}
                            </option>
                          ))}
                      </select>
                    </div>

                    <p className="mt-2 text-lg font-semibold text-slate-200">
                      {lead.address}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Submitted {formatDate(lead.created_at)}
                    </p>

                    <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                      <p>
                        <span className="font-bold text-slate-500">Phone:</span>{" "}
                        <a
                          href={`tel:${lead.phone}`}
                          className="hover:text-emerald-400"
                        >
                          {lead.phone}
                        </a>
                      </p>

                      <p>
                        <span className="font-bold text-slate-500">Email:</span>{" "}
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-emerald-400"
                        >
                          {lead.email}
                        </a>
                      </p>

                      <p>
                        <span className="font-bold text-slate-500">
                          Request:
                        </span>{" "}
                        {lead.request_type ?? "Not provided"}
                      </p>

                      <p>
                        <span className="font-bold text-slate-500">
                          Boilers:
                        </span>{" "}
                        {lead.boilers ?? "Not provided"}
                      </p>
                    </div>

                    {lead.message && (
                      <div className="mt-5 rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                        {lead.message}
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-3">
                    <a
                      href={`tel:${lead.phone}`}
                      className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
                    >
                      Call
                    </a>

                    <a
                      href={`mailto:${lead.email}`}
                      className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-400"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}