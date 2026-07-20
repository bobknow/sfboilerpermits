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

export default async function CustomersPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("id, created_at, name, email, phone, notes")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Customers page error:", error);

    return (
      <main className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">Customers</h1>

          <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
            Customers could not be loaded.
          </div>
        </div>
      </main>
    );
  }

  const customers = (data ?? []) as Customer[];

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-slate-800 pb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            CRM
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Customers
          </h1>

          <p className="mt-2 text-slate-400">
            Converted leads and active customer records.
          </p>
        </header>

        <section className="py-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black">All Customers</h2>

            <span className="text-sm text-slate-400">
              {customers.length} record{customers.length === 1 ? "" : "s"}
            </span>
          </div>

          {customers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
              <p className="text-xl font-bold">No customers yet</p>

              <p className="mt-2 text-slate-400">
                Converted leads will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {customers.map((customer) => (
                <a
                  key={customer.id}
                  href={`/admin/customers/${customer.id}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-600 hover:bg-slate-900/80"
                >
                  <h2 className="text-xl font-black text-white">
                    {customer.name}
                  </h2>

                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    <p>{customer.phone ?? "No phone provided"}</p>
                    <p>{customer.email ?? "No email provided"}</p>
                  </div>

                  <p className="mt-5 text-sm font-bold text-emerald-400">
                    View customer →
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