"use client";

import { useMemo, useState } from "react";
import ConvertLeadModal from "@/components/admin/ConvertLeadModal";
import LeadCard from "@/components/admin/LeadCard";
import LeadFilters from "@/components/admin/LeadFilters";
import StatsCards from "@/components/admin/StatsCards";
import type { Lead, LeadStatus } from "@/types/lead";

type LeadsDashboardProps = {
  leads: Lead[];
};

export default function LeadsDashboard({ leads }: LeadsDashboardProps) {
  const [localLeads, setLocalLeads] = useState(leads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingLeadId, setUpdatingLeadId] = useState<number | null>(null);
  const [confirmLead, setConfirmLead] = useState<Lead | null>(null);
  const [convertingLeadId, setConvertingLeadId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  async function updateLeadStatus(
    leadId: number,
    status: LeadStatus,
  ) {
    setUpdatingLeadId(leadId);
    setErrorMessage("");

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
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update lead.",
      );
    } finally {
      setUpdatingLeadId(null);
    }
  }

  async function convertLead() {
    if (!confirmLead) {
      return;
    }

    setConvertingLeadId(confirmLead.id);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/leads/${confirmLead.id}/convert`,
        {
          method: "POST",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to convert lead.");
      }

      setLocalLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === confirmLead.id
            ? { ...lead, status: "Converted" }
            : lead,
        ),
      );

      setConfirmLead(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to convert lead.",
      );
    } finally {
      setConvertingLeadId(null);
    }
  }

  return (
    <>
      <StatsCards leads={localLeads} />

      <LeadFilters
        query={query}
        onQueryChange={setQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-800 bg-red-950/50 px-5 py-4 text-sm font-semibold text-red-200">
          {errorMessage}
        </div>
      )}

      <section>
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
              <LeadCard
                key={lead.id}
                lead={lead}
                updating={updatingLeadId === lead.id}
                onStatusChange={(status) =>
                  updateLeadStatus(lead.id, status)
                }
                onConvert={() => setConfirmLead(lead)}
              />
            ))}
          </div>
        )}
      </section>

      <ConvertLeadModal
        lead={confirmLead}
        converting={convertingLeadId === confirmLead?.id}
        onCancel={() => setConfirmLead(null)}
        onConfirm={convertLead}
      />
    </>
  );
}