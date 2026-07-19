import type { Lead } from "@/types/lead";

type ConvertLeadModalProps = {
  lead: Lead | null;
  converting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConvertLeadModal({
  lead,
  converting,
  onCancel,
  onConfirm,
}: ConvertLeadModalProps) {
  if (!lead) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 px-6">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-7 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-300">
          Convert Lead
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          Convert this lead?
        </h2>

        <div className="mt-5 rounded-xl bg-slate-950 p-5 text-slate-300">
          <p>
            <strong className="text-white">Customer:</strong> {lead.name}
          </p>

          <p className="mt-2">
            <strong className="text-white">Property:</strong> {lead.address}
          </p>

          <p className="mt-2">
            <strong className="text-white">Request:</strong>{" "}
            {lead.request_type ?? "Boiler Permit Request"}
          </p>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-400">
          This creates or reuses the customer and property, creates a service
          request, and marks the original lead as Converted.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={converting}
            className="rounded-lg border border-slate-700 px-5 py-3 font-bold text-slate-300 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={converting}
            className="rounded-lg bg-fuchsia-600 px-5 py-3 font-bold text-white transition hover:bg-fuchsia-500 disabled:cursor-wait disabled:opacity-60"
          >
            {converting ? "Converting..." : "Convert Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}