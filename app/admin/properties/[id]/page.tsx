import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { id } = await params;

  const propertyId = Number(id);

  const { data: property } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  if (!property) {
    notFound();
  }

  const { data: requests } = await supabaseAdmin
    .from("service_requests")
    .select("*")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false });

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <a
          href="/admin/properties"
          className="text-sm font-bold text-emerald-400 hover:text-emerald-300"
        >
          ← Back to Properties
        </a>

        <header className="mt-6 border-b border-slate-800 pb-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Property
          </p>

          <h1 className="mt-3 text-4xl font-black">
            {property.building_name || property.address_line_1}
          </h1>

          <p className="mt-2 text-slate-400">
            {property.address_line_1}
          </p>

        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-black">
              Property Information
            </h2>

            <div className="mt-6 space-y-3">

              <p>
                <strong>City:</strong> {property.city}
              </p>

              <p>
                <strong>State:</strong> {property.state}
              </p>

              <p>
                <strong>ZIP:</strong> {property.postal_code}
              </p>

              <p>
                <strong>Type:</strong> {property.property_type}
              </p>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-black">
              BoilerWatch
            </h2>

            <div className="mt-6">

              <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">

                <p className="font-bold">
                  No BoilerWatch devices installed
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  ESP32 devices will appear here.
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-black">
              Service Requests
            </h2>

            <div className="mt-5 space-y-4">

              {(requests ?? []).map((request) => (
                <div
                  key={request.id}
                  className="rounded-xl bg-slate-950 p-4"
                >
                  <p className="font-bold">
                    {request.request_number}
                  </p>

                  <p className="text-sm text-slate-400">
                    {request.request_type}
                  </p>

                  <p className="mt-2 text-emerald-400">
                    {request.status}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}