import ServiceRequestsCenter from "@/components/admin/ServiceRequestsCenter";
import { getCurrentTenant } from "@/lib/currentTenant";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { ServiceRequest } from "@/types/ServiceRequest";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ServiceRequestsPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const tenant = await getCurrentTenant();

  const { data, error } = await supabaseAdmin
    .from("service_requests")
    .select(`
      id,
      tenant_id,
      customer_id,
      property_id,
      equipment_id,
      request_number,
      request_type,
      priority,
      status,
      description,
      created_at
    `)
    .eq("tenant_id", tenant.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);

    return (
      <main className="px-6 py-10">
        <h1 className="text-3xl font-black">
          Service Requests
        </h1>

        <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
          Unable to load service requests.
        </div>
      </main>
    );
  }

  const requests = (data ?? []) as ServiceRequest[];

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <header className="border-b border-slate-800 pb-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Operations
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Service Requests
          </h1>

          <p className="mt-2 text-slate-400">
            Dispatch board for every active job.
          </p>

        </header>

        <ServiceRequestsCenter
          requests={requests}
        />

      </div>
    </main>
  );
}