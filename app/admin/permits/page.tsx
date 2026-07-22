import PermitsCenter from "@/components/admin/PermitsCenter";
import { getCurrentTenant } from "@/lib/currentTenant";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PermitsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const tenant = await getCurrentTenant();

  const { data, error } = await supabaseAdmin
    .from("permits")
    .select("*")
    .eq("tenant_id", tenant.id)
    .order("expiration_date", { ascending: true });

  if (error) {
    console.error(error);

    return (
      <main className="px-6 py-10">
        <h1 className="text-3xl font-black">
          PermitWatch
        </h1>

        <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
          Unable to load permits.
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10 lg:px-10">

      <div className="mx-auto max-w-7xl">

        <header className="border-b border-slate-800 pb-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            PermitWatch
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Boiler Permits
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor every permit before it expires.
          </p>

        </header>

        <PermitsCenter permits={data ?? []} />

      </div>

    </main>
  );
}