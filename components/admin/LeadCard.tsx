import type { Lead, LeadStatus } from "@/types/lead";
import StatusSelect from "./StatusSelect";

type LeadCardProps = {
  lead: Lead;
  updating: boolean;
  onStatusChange: (status: LeadStatus) => void;
  onConvert: () => void;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function LeadCard({
  lead,
  updating,
  onStatusChange,
  onConvert,
}: LeadCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-black text-white">
              {lead.name}
            </h3>

            <StatusSelect
              status={lead.status}
              disabled={updating}
              onChange={onStatusChange}
            />
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

          {lead.status !== "Converted" && (
            <button
              type="button"
              onClick={onConvert}
              className="rounded-lg border border-fuchsia-700 px-5 py-3 text-sm font-bold text-fuchsia-300 transition hover:bg-fuchsia-950/40"
            >
              Convert
            </button>
          )}
        </div>
      </div>
    </article>
  );
}