"use client";

import { useMemo, useState } from "react";
import type {
  ServiceRequest,
  ServiceRequestStatus,
} from "@/types/ServiceRequest";

type ServiceRequestsCenterProps = {
  requests: ServiceRequest[];
};

const statuses: Array<"All" | ServiceRequestStatus> = [
  "All",
  "New",
  "Assigned",
  "Scheduled",
  "In Progress",
  "Waiting",
  "Complete",
  "Cancelled",
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function statusClasses(status: ServiceRequestStatus) {
  switch (status) {
    case "New":
      return "border-emerald-700 bg-emerald-400/10 text-emerald-300";
    case "Assigned":
      return "border-amber-700 bg-amber-400/10 text-amber-300";
    case "Scheduled":
      return "border-sky-700 bg-sky-400/10 text-sky-300";
    case "In Progress":
      return "border-orange-700 bg-orange-400/10 text-orange-300";
    case "Waiting":
      return "border-slate-600 bg-slate-700/50 text-slate-300";
    case "Complete":
      return "border-violet-700 bg-violet-400/10 text-violet-300";
    case "Cancelled":
      return "border-red-700 bg-red-400/10 text-red-300";
  }
}

function priorityClasses(priority: ServiceRequest["priority"]) {
  switch (priority) {
    case "Emergency":
      return "bg-red-500/15 text-red-300";
    case "High":
      return "bg-orange-500/15 text-orange-300";
    case "Normal":
      return "bg-sky-500/15 text-sky-300";
    case "Low":
      return "bg-slate-700 text-slate-300";
  }
}

export default function ServiceRequestsCenter({
  requests,
}: ServiceRequestsCenterProps) {
  const [localRequests, setLocalRequests] = useState(requests);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statuses)[number]>("All");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return localRequests.filter((request) => {
      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        request.request_number?.toLowerCase().includes(normalizedQuery) ||
        request.request_type.toLowerCase().includes(normalizedQuery) ||
        request.description?.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [localRequests, query, statusFilter]);

  async function updateStatus(
    requestId: number,
    status: ServiceRequestStatus,
  ) {
    setUpdatingId(requestId);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to update the service request.",
        );
      }

      setLocalRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId ? { ...request, status } : request,
        ),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update the service request.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const openCount = localRequests.filter(
    (request) =>
      request.status !== "Complete" &&
      request.status !== "Cancelled",
  ).length;

  const emergencyCount = localRequests.filter(
    (request) =>
      request.priority === "Emergency" &&
      request.status !== "Complete" &&
      request.status !== "Cancelled",
  ).length;

  const completedCount = localRequests.filter(
    (request) => request.status === "Complete",
  ).length;

  return (
    <>
      <section className="grid gap-4 py-8 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-semibold text-slate-400">
            Open Requests
          </p>
          <p className="mt-2 text-4xl font-black">{openCount}</p>
        </div>

        <div className="rounded-2xl border border-red-800 bg-red-950/30 p-6">
          <p className="text-sm font-semibold text-red-300">
            Emergencies
          </p>
          <p className="mt-2 text-4xl font-black text-red-300">
            {emergencyCount}
          </p>
        </div>

        <div className="rounded-2xl border border-violet-800 bg-violet-950/30 p-6">
          <p className="text-sm font-semibold text-violet-300">
            Completed
          </p>
          <p className="mt-2 text-4xl font-black text-violet-300">
            {completedCount}
          </p>
        </div>
      </section>

      <section>
        <div className="mb-6 grid gap-4 xl:grid-cols-[1fr_auto]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search request number, type, or description"
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
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

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-800 bg-red-950/50 px-5 py-4 text-sm font-semibold text-red-200">
            {errorMessage}
          </div>
        )}

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black">Request Queue</h2>

          <span className="text-sm text-slate-400">
            {filteredRequests.length} result
            {filteredRequests.length === 1 ? "" : "s"}
          </span>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
            <p className="text-xl font-bold">No matching requests</p>
            <p className="mt-2 text-slate-400">
              Try another search or status filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black">
                        {request.request_number ??
                          `Request #${request.id}`}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${priorityClasses(
                          request.priority,
                        )}`}
                      >
                        {request.priority}
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-semibold text-slate-200">
                      {request.request_type}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Created {formatDate(request.created_at)}
                    </p>

                    {request.description && (
                      <p className="mt-5 rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                        {request.description}
                      </p>
                    )}
                  </div>

                  <select
                    value={request.status}
                    disabled={updatingId === request.id}
                    onChange={(event) =>
                      updateStatus(
                        request.id,
                        event.target.value as ServiceRequestStatus,
                      )
                    }
                    className={`rounded-xl border px-4 py-3 text-sm font-bold outline-none transition disabled:cursor-wait disabled:opacity-60 ${statusClasses(
                      request.status,
                    )}`}
                  >
                    {statuses
                      .filter((status) => status !== "All")
                      .map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="bg-slate-900 text-white"
                        >
                          {status}
                        </option>
                      ))}
                  </select>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}