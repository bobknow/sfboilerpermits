import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type EquipmentRecord = {
  id: number;
  display_name: string;
  equipment_type: string;
  manufacturer: string | null;
  model: string | null;
  serial_number: string | null;
  operational_status: string;
  properties: {
    id: number;
    address_line_1: string;
  } | null;
};

export default async function EquipmentPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { data, error } = await supabaseAdmin
    .from("equipment")
    .select(
      `
        id,
        display_name,
        equipment_type,
        manufacturer,
        model,
        serial_number,
        operational_status,
        properties:property_id (
          id,
          address_line_1
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Equipment page error:", error);

    return (
      <main className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">Equipment</h1>

          <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
            Equipment could not be loaded.
          </div>
        </div>
      </main>
    );
  }

  const equipment = (data ?? []) as unknown as EquipmentRecord[];

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-slate-800 pb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Asset Management
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Equipment
          </h1>

          <p className="mt-2 text-slate-400">
            Boilers, water heaters, HVAC equipment, and monitored assets.
          </p>
        </header>

        <section className="py-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black">All Equipment</h2>

            <span className="text-sm text-slate-400">
              {equipment.length} record{equipment.length === 1 ? "" : "s"}
            </span>
          </div>

          {equipment.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
              <p className="text-xl font-bold">No equipment yet</p>

              <p className="mt-2 text-slate-400">
                Boilers and other equipment will appear here once added to a
                property.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {equipment.map((item) => (
                <a
                  key={item.id}
                  href={`/admin/equipment/${item.id}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-600"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                    {item.equipment_type}
                  </p>

                  <h2 className="mt-3 text-xl font-black text-white">
                    {item.display_name}
                  </h2>

                  <div className="mt-4 space-y-2 text-sm text-slate-400">
                    <p>
                      {item.manufacturer ?? "Unknown manufacturer"}{" "}
                      {item.model ?? ""}
                    </p>

                    <p>
                      Serial: {item.serial_number ?? "Not provided"}
                    </p>

                    <p>
                      Property:{" "}
                      {item.properties?.address_line_1 ?? "Not assigned"}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                      {item.operational_status}
                    </span>

                    <span className="text-sm font-bold text-emerald-400">
                      View →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}