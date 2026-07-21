import AddEquipmentForm from "@/components/admin/AddEquipmentForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Property = {
  id: number;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  building_name: string | null;
  property_type: string | null;
  access_notes: string | null;
  general_notes: string | null;
  primary_contact_id: number | null;
};

type Customer = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
};

type Equipment = {
  id: number;
  display_name: string;
  equipment_type: string;
  manufacturer: string | null;
  model: string | null;
  serial_number: string | null;
  fuel_type: string | null;
  capacity_btu: number | null;
  installation_year: number | null;
  location_description: string | null;
  operational_status: string;
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

type Device = {
  id: number;
  device_uid: string;
  display_name: string;
  status: string;
  connection_type: string;
  last_seen_at: string | null;
  equipment_id: number | null;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatNumber(value: number | null) {
  return value === null ? "Not provided" : value.toLocaleString("en-US");
}

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

  if (!Number.isInteger(propertyId) || propertyId < 1) {
    notFound();
  }

  const [
    { data: propertyData, error: propertyError },
    { data: equipmentData, error: equipmentError },
    { data: requestData, error: requestError },
    { data: deviceData, error: deviceError },
  ] = await Promise.all([
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
          property_type,
          access_notes,
          general_notes,
          primary_contact_id
        `,
      )
      .eq("id", propertyId)
      .single(),

    supabaseAdmin
      .from("equipment")
      .select(
        `
          id,
          display_name,
          equipment_type,
          manufacturer,
          model,
          serial_number,
          fuel_type,
          capacity_btu,
          installation_year,
          location_description,
          operational_status
        `,
      )
      .eq("property_id", propertyId)
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
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false }),

    supabaseAdmin
      .from("devices")
      .select(
        `
          id,
          device_uid,
          display_name,
          status,
          connection_type,
          last_seen_at,
          equipment_id
        `,
      )
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false }),
  ]);

  if (propertyError || !propertyData) {
    console.error("Property detail error:", propertyError);
    notFound();
  }

  if (equipmentError) {
    console.error("Property equipment error:", equipmentError);
  }

  if (requestError) {
    console.error("Property requests error:", requestError);
  }

  if (deviceError) {
    console.error("Property devices error:", deviceError);
  }

  const property = propertyData as Property;
  const equipment = (equipmentData ?? []) as Equipment[];
  const serviceRequests = (requestData ?? []) as ServiceRequest[];
  const devices = (deviceData ?? []) as Device[];

  let customer: Customer | null = null;

  if (property.primary_contact_id) {
    const { data: customerData, error: customerError } = await supabaseAdmin
      .from("customers")
      .select("id, name, phone, email")
      .eq("id", property.primary_contact_id)
      .single();

    if (customerError) {
      console.error("Property customer error:", customerError);
    } else {
      customer = customerData as Customer;
    }
  }

  const onlineDevices = devices.filter(
    (device) => device.status === "Online",
  ).length;

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <a
          href="/admin/properties"
          className="text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
        >
          ← Back to properties
        </a>

        <header className="mt-6 border-b border-slate-800 pb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Property
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {property.building_name ?? property.address_line_1}
          </h1>

          {property.building_name && (
            <p className="mt-2 text-lg text-slate-300">
              {property.address_line_1}
            </p>
          )}

          <p className="mt-1 text-slate-400">
            {property.city}, {property.state} {property.postal_code ?? ""}
          </p>
        </header>

        <section className="grid gap-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">Equipment</p>
            <p className="mt-2 text-4xl font-black">{equipment.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">
              Service Requests
            </p>
            <p className="mt-2 text-4xl font-black">
              {serviceRequests.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">
              BoilerWatch Devices
            </p>
            <p className="mt-2 text-4xl font-black">{devices.length}</p>
          </div>

          <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-6">
            <p className="text-sm font-semibold text-emerald-300">
              Devices Online
            </p>
            <p className="mt-2 text-4xl font-black text-emerald-400">
              {onlineDevices}
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-black">Property Information</h2>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>
                  <span className="font-bold text-slate-500">Type:</span>{" "}
                  {property.property_type ?? "Not provided"}
                </p>

                <p>
                  <span className="font-bold text-slate-500">Address:</span>{" "}
                  {property.address_line_1}
                  {property.address_line_2
                    ? `, ${property.address_line_2}`
                    : ""}
                </p>

                <p>
                  <span className="font-bold text-slate-500">City:</span>{" "}
                  {property.city}
                </p>

                <p>
                  <span className="font-bold text-slate-500">State:</span>{" "}
                  {property.state}
                </p>

                <p>
                  <span className="font-bold text-slate-500">ZIP:</span>{" "}
                  {property.postal_code ?? "Not provided"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-black">Primary Contact</h2>

              {customer ? (
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <a
                    href={`/admin/customers/${customer.id}`}
                    className="text-lg font-black text-white transition hover:text-emerald-400"
                  >
                    {customer.name}
                  </a>

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
              ) : (
                <p className="mt-5 text-slate-400">
                  No primary contact assigned.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-black">Property Notes</h2>

              <div className="mt-5 space-y-5 text-sm leading-6 text-slate-300">
                <div>
                  <p className="font-bold text-slate-500">Access Notes</p>
                  <p className="mt-1">
                    {property.access_notes ?? "No access notes yet."}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-500">General Notes</p>
                  <p className="mt-1">
                    {property.general_notes ?? "No general notes yet."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Assets
                  </p>

                  <h2 className="mt-2 text-2xl font-black">Equipment</h2>
                </div>

                <span className="text-sm text-slate-500">
                  {equipment.length} record
                  {equipment.length === 1 ? "" : "s"}
                </span>
              </div>

              {equipment.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                  <p className="font-bold">No equipment added yet</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Add the property’s first boiler or monitored asset below.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {equipment.map((item) => (
                    <a
                      key={item.id}
                      href={`/admin/equipment/${item.id}`}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-emerald-600"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
                            {item.equipment_type}
                          </p>

                          <h3 className="mt-2 text-lg font-black">
                            {item.display_name}
                          </h3>
                        </div>

                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                          {item.operational_status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-slate-400">
                        <p>
                          {item.manufacturer ?? "Unknown manufacturer"}{" "}
                          {item.model ?? ""}
                        </p>

                        <p>
                          Serial: {item.serial_number ?? "Not provided"}
                        </p>

                        <p>Fuel: {item.fuel_type ?? "Not provided"}</p>

                        <p>
                          Capacity: {formatNumber(item.capacity_btu)} BTU
                        </p>

                        <p>
                          Installed:{" "}
                          {item.installation_year ?? "Not provided"}
                        </p>

                        <p>
                          Location:{" "}
                          {item.location_description ?? "Not provided"}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <AddEquipmentForm propertyId={propertyId} />

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Monitoring
                  </p>

                  <h2 className="mt-2 text-2xl font-black">BoilerWatch</h2>
                </div>

                <span className="text-sm text-slate-500">
                  {devices.length} device{devices.length === 1 ? "" : "s"}
                </span>
              </div>

              {devices.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
                  <p className="font-bold">
                    No BoilerWatch devices installed
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Registered monitoring devices will appear here.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-black">{device.display_name}</p>

                          <p className="mt-1 text-sm text-slate-500">
                            {device.device_uid}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                            device.status === "Online"
                              ? "bg-emerald-400/10 text-emerald-400"
                              : "bg-red-400/10 text-red-300"
                          }`}
                        >
                          {device.status}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                        <p>Connection: {device.connection_type}</p>

                        <p>
                          Last seen:{" "}
                          {device.last_seen_at
                            ? formatDate(device.last_seen_at)
                            : "Never"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Service Requests</h2>

                <span className="text-sm text-slate-500">
                  {serviceRequests.length}
                </span>
              </div>

              {serviceRequests.length === 0 ? (
                <p className="mt-5 text-slate-400">
                  No service requests for this property.
                </p>
              ) : (
                <div className="mt-5 space-y-3">
                  {serviceRequests.map((request) => (
                    <article
                      key={request.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-black">
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

                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {request.priority} priority ·{" "}
                        {formatDate(request.created_at)}
                      </p>

                      {request.description && (
                        <p className="mt-4 text-sm leading-6 text-slate-300">
                          {request.description}
                        </p>
                      )}
                    </article>
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