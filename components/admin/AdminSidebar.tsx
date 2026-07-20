const navigation = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Properties", href: "/admin/properties" },
  { label: "Equipment", href: "/admin/equipment" },
  { label: "Permits", href: "/admin/permits" },
  { label: "Service Requests", href: "/admin/service-requests" },
  { label: "BoilerWatch", href: "/admin/boilerwatch" },
];

export default function AdminSidebar() {
  return (
    <aside className="border-b border-slate-800 bg-slate-950 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="px-6 py-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
          BK3 Platform
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          SF Boiler Permits
        </h2>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-2 lg:overflow-visible">
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-slate-900 hover:text-emerald-400"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="hidden px-6 py-6 text-sm text-slate-500 lg:block">
        <a href="/" className="transition hover:text-emerald-400">
          View public website
        </a>
      </div>
    </aside>
  );
}