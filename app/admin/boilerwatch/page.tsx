import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Device = {
  id: number;
  device_uid: string;
  display_name: string;
  device_type: string;
  firmware_version: string | null;
  connection_type: string;
  status: string;
  last_seen_at: string | null;
  installed_at: string | null;
  properties: {
    id: number;
    address_line_1: string;
  } | null;
  equipment: {
    id: number;
    display_name: string;
  } | null;
};

function formatDate(date: string | null) {
  if (!date) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function BoilerWatchPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { data, error } = await supabaseAdmin
    .from("devices")
    .select(
      `
        id,
        device_uid,
        display_name,
        device_type,
        firmware_version,
        connection_type,
        status,
        last_seen_at,
        installed_at,
        properties:property_id (
          id,
          address_line_1
        ),
        equipment:equipment_id (
          id,
          display_name
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("BoilerWatch page error:", error);

    return (
      <main className="px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">BoilerWatch</h1>

          <div className="mt-8 rounded-xl border border-red-800 bg-red-950/50 p-6 text-red-200">
            BoilerWatch devices could not be loaded.
          </div>
        </div>
      </main>
    );
  }

  const devices = (data ?? []) as unknown as Device[];

  const onlineCount = devices.filter(
    (device) => device.status === "Online",
  ).length;

  const offlineCount = devices.filter(
    (device) => device.status === "Offline",
  ).length;

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-slate-800 pb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Monitoring
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            BoilerWatch
          </h1>

          <p className="mt-2 text-slate-400">
            Live device status, monitored equipment, and mechanical-room
            conditions.
          </p>
        </header>

        <section className="grid gap-4 py-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">
              Total Devices
            </p>

            <p className="mt-2 text-4xl font-black">{devices.length}</p>
          </div>

          <div className="rounded-2xl border border-emerald-800 bg-emerald-950/30 p-6">
            <p className="text-sm font-semibold text-emerald-300">Online</p>

            <p className="mt-2 text-4xl font-black text-emerald-400">
              {onlineCount}
            </p>
          </div>

          <div className="rounded-2xl border border-red-800 bg-red-950/30 p-6">
            <p className="text-sm font-semibold text-red-300">Offline</p>

            <p className="mt-2 text-4xl font-black text-red-300">
              {offlineCount}
            </p>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black">Devices</h2>

            <span className="text-sm text-slate-400">
              {devices.length} record{devices.length === 1 ? "" : "s"}
            </span>
          </div>

          {devices.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center">
              <p className="text-xl font-bold">
                No BoilerWatch devices installed
              </p>

              <p className="mt-2 text-slate-400">
                Registered ESP32 or Raspberry Pi devices will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {devices.map((device) => (
                <article
                  key={device.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                        {device.device_type}
                      </p>

                      <h2 className="mt-2 text-xl font-black">
                        {device.display_name}
                      </h2>
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

                  <div className="mt-5 space-y-2 text-sm text-slate-400">
                    <p>Device ID: {device.device_uid}</p>

                    <p>
                      Property:{" "}
                      {device.properties?.address_line_1 ?? "Not assigned"}
                    </p>

                    <p>
                      Equipment:{" "}
                      {device.equipment?.display_name ?? "Not assigned"}
                    </p>

                    <p>Connection: {device.connection_type}</p>

                    <p>
                      Firmware: {device.firmware_version ?? "Not reported"}
                    </p>

                    <p>Last seen: {formatDate(device.last_seen_at)}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}