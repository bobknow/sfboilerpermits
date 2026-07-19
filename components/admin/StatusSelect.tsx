import type { LeadStatus } from "@/types/lead";

type StatusSelectProps = {
  status: LeadStatus;
  disabled?: boolean;
  onChange: (status: LeadStatus) => void;
};

const editableStatuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Scheduled",
  "Complete",
  "Lost",
];

function getStatusClasses(status: LeadStatus) {
  switch (status) {
    case "New":
      return "border-emerald-600/30 bg-emerald-400/10 text-emerald-400";

    case "Contacted":
      return "border-amber-600/30 bg-amber-400/10 text-amber-300";

    case "Scheduled":
      return "border-sky-600/30 bg-sky-400/10 text-sky-300";

    case "Complete":
      return "border-violet-600/30 bg-violet-400/10 text-violet-300";

    case "Converted":
      return "border-fuchsia-600/30 bg-fuchsia-400/10 text-fuchsia-300";

    case "Lost":
      return "border-red-600/30 bg-red-400/10 text-red-300";

    default:
      return "border-slate-600 bg-slate-700 text-white";
  }
}

export default function StatusSelect({
  status,
  disabled = false,
  onChange,
}: StatusSelectProps) {
  const isConverted = status === "Converted";

  if (isConverted) {
    return (
      <span
        className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStatusClasses(
          status,
        )}`}
      >
        Converted
      </span>
    );
  }

  return (
    <select
      value={status}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as LeadStatus)}
      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide outline-none transition disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClasses(
        status,
      )}`}
    >
      {editableStatuses.map((statusOption) => (
        <option
          key={statusOption}
          value={statusOption}
          className="bg-slate-900 text-white"
        >
          {statusOption}
        </option>
      ))}
    </select>
  );
}