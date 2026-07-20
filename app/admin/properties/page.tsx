import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Property = {
  id: number;
  created_at: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  building_name: string | null;
  property_type: string | null;
  customers: {
    id: number;
    name: string;
  } | null;
};

export default async function PropertiesPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { data, error } = await supabaseAdmin
    .from("properties")
    .select(
      `
        id,
        created_at,
        address_line_1,
        address_line_2,
        city,
        state,
        postal_code,
        building_name,
        property_type,
        customers:primary_contact_id (
          id,
          name
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Properties page error:", error);

    return (
      <main className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">Properties</h1>

          <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
            Properties could not be loaded.
          </div>
        </div>
      </main>
    );
  }

  const properties = (data ?? []) as unknown as Property[];

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-slate-800 pb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Portfolio
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Properties
          </h1>

          <p className="mt-2 text-slate-400">
            Buildings, equipment, permits, service history, and monitoring.
          </p>
        </header>

        <section className="py-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black">All Properties</h2>

            <span className="text-sm text-slate-400">
              {properties.length} record{properties.length === 1 ? "" : "s"}
            </span>
          </div>

          {properties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
              <p className="text-xl font-bold">No properties yet</p>

              <p className="mt-2 text-slate-400">
                Properties created from converted leads will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <a
                  key={property.id}
                  href={`/admin/properties/${property.id}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-600"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                    {property.property_type ?? "Property"}
                  </p>

                  <h2 className="mt-3 text-xl font-black text-white">
                    {property.building_name ?? property.address_line_1}
                  </h2>

                  {property.building_name && (
                    <p className="mt-1 text-sm text-slate-400">
                      {property.address_line_1}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-slate-400">
                    {property.city}, {property.state}{" "}
                    {property.postal_code ?? ""}
                  </p>

                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <p className="text-sm text-slate-500">Primary contact</p>

                    <p className="mt-1 font-bold text-slate-200">
                      {property.customers?.name ?? "Not assigned"}
                    </p>
                  </div>

                  <p className="mt-5 text-sm font-bold text-emerald-400">
                    View property →
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}