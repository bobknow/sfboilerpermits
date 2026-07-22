"use client";

type Permit = {
  id: number;
  permit_number: string | null;
  permit_type: string;
  status: string;
  issued_date: string | null;
  expiration_date: string | null;
  inspection_date: string | null;
  jurisdiction: string;
};

export default function PermitsCenter({
  permits,
}: {
  permits: Permit[];
}) {
  function daysRemaining(date: string | null) {
    if (!date) {
      return null;
    }

    const diff = new Date(date).getTime() - new Date().getTime();

    return Math.ceil(diff / 86400000);
  }

  if (permits.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
        <h2 className="text-2xl font-black">No permits yet</h2>

        <p className="mt-3 text-slate-400">
          Add your first boiler permit to start tracking renewals,
          inspections, and expiration dates.
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-emerald-600 px-6 py-3 font-bold transition hover:bg-emerald-500"
        >
          + Add Permit
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      {permits.map((permit) => {
        const days = daysRemaining(permit.expiration_date);

        let badge = "bg-emerald-600";

        if (days !== null && days <= 30) {
          badge = "bg-red-600";
        } else if (days !== null && days <= 90) {
          badge = "bg-yellow-500 text-slate-950";
        }

        return (
          <div
            key={permit.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black">
                  {permit.permit_number ?? "Pending Permit"}
                </h2>

                <p className="mt-1 text-slate-400">{permit.permit_type}</p>
              </div>

              <span
                className={`${badge} w-fit rounded-full px-4 py-2 text-sm font-bold`}
              >
                {days === null
                  ? "No Expiration"
                  : days < 0
                    ? `${Math.abs(days)} Days Overdue`
                    : `${days} Days`}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <p>{permit.status}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Issued</p>
                <p>{permit.issued_date ?? "-"}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Jurisdiction</p>
                <p>{permit.jurisdiction}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}