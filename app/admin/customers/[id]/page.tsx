import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Customer = {
  id: number;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
};

type Property = {
  id: number;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  building_name: string | null;
  property_type: string | null;
};

type ServiceRequest = {
  id: number;
  request_number: string | null;
  request_type: string;
  status: string;
  priority: string;
  description: string | null;
  created_at: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { id } = await params;
  const customerId = Number(id);

  if (!Number.isInteger(customerId) || customerId < 1) {
    notFound();
  }

  const [
    { data: customerData, error: customerError },
    { data: propertyData, error: propertyError },
    { data: requestData, error: requestError },
  ] = await Promise.all([
    supabaseAdmin
      .from("customers")
      .select("id, created_at, name, email, phone, notes")
      .eq("id", customerId)
      .single(),
    supabaseAdmin
      .from("properties")
      .select(
        `
          id,
          address_line_1,
          address_line_2,
          city,
          state,
          postal_code,
          building_name,
          property_type
        `,
      )
      .eq("primary_contact_id", customerId)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("service_requests")
      .select(
        `
          id,
          request_number,
          request_type,
          status,
          priority,
          description,
          created_at
        `,
      )
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false }),
  ]);

  if (customerError || !customerData) {
    console.error("Customer detail error:", customerError);
    notFound();
  }

  if (propertyError) {
    console.error("Customer properties error:", propertyError);
  }

  if (requestError) {
    console.error("Customer service requests error:", requestError);
  }

  const customer = customerData as Customer;
  const properties = (propertyData ?? []) as Property[];
  const serviceRequests = (requestData ?? []) as ServiceRequest[];

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <a
          href="/admin/customers"
          className="text-sm font-bold text-emerald-400 hover:text-emerald-300"
        >
          ← Back to customers
        </a>

        <header className="mt-6 border-b border-slate-800 pb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Customer
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {customer.name}
          </h1>

          <p className="mt-2 text-slate-400">
            Customer since {formatDate(customer.created_at)}
          </p>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-black">Contact Information</h2>

              <div className="mt-5 space-y-3 text-slate-300">
                <p>
                  <span className="font-bold text-slate-500">Phone:</span>{" "}
                  {customer.phone ? (
                    <a
                      href={`tel:${customer.phone}`}
                      className="hover:text-emerald-400"
                    >
                      {customer.phone}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>

                <p>
                  <span className="font-bold text-slate-500">Email:</span>{" "}
                  {customer.email ? (
                    <a
                      href={`mailto:${customer.email}`}
                      className="hover:text-emerald-400"
                    >
                      {customer.email}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-black">Notes</h2>

              <p className="mt-4 leading-7 text-slate-300">
                {customer.notes ?? "No customer notes yet."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black">Properties</h2>
                <span className="text-sm text-slate-500">
                  {properties.length}
                </span>
              </div>

              {properties.length === 0 ? (
                <p className="mt-5 text-slate-400">
                  No properties connected to this customer.
                </p>
              ) : (
                <div className="mt-5 space-y-3">
                  {properties.map((property) => (
                    <a
                      key={property.id}
                      href={`/admin/properties/${property.id}`}
                      className="block rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-emerald-600"
                    >
                      <p className="font-black text-white">
                        {property.building_name ?? property.address_line_1}
                      </p>

                      {property.building_name && (
                        <p className="mt-1 text-sm text-slate-400">
                          {property.address_line_1}
                        </p>
                      )}

                      <p className="mt-1 text-sm text-slate-400">
                        {property.city}, {property.state}{" "}
                        {property.postal_code ?? ""}
                      </p>

                      <p className="mt-3 text-sm font-bold text-emerald-400">
                        View property →
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black">Service Requests</h2>
                <span className="text-sm text-slate-500">
                  {serviceRequests.length}
                </span>
              </div>

              {serviceRequests.length === 0 ? (
                <p className="mt-5 text-slate-400">
                  No service requests for this customer.
                </p>
              ) : (
                <div className="mt-5 space-y-3">
                  {serviceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-black text-white">
                            {request.request_number ??
                              `Request #${request.id}`}
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            {request.request_type}
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
                          {request.status}
                        </span>
                      </div>

                      {request.description && (
                        <p className="mt-4 text-sm leading-6 text-slate-300">
                          {request.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}