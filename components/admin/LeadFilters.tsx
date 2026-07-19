type LeadFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
};

const statuses = [
  "All",
  "New",
  "Contacted",
  "Scheduled",
  "Complete",
  "Converted",
  "Lost",
];

export default function LeadFilters({
  query,
  onQueryChange,
  statusFilter,
  onStatusChange,
}: LeadFiltersProps) {
  return (
    <section className="mb-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search name, address, phone, or email..."
          className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />

        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
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
    </section>
  );
}