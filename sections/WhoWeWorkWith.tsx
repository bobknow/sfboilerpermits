const clients = [
  "Property Managers",
  "Property Owners",
  "Apartment Buildings",
  "Commercial Properties",
  "HOAs",
  "Schools",
  "Hotels",
  "Hospitals",
  "Mechanical Contractors",
];

export default function WhoWeWorkWith() {
  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="mx-auto max-w-7xl">

        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-emerald-400 text-sm font-semibold">
            WHO WE WORK WITH
          </p>

          <h2 className="mt-4 text-4xl font-black text-white">
            Trusted Across San Francisco
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-300">
            Whether you manage one boiler or an entire portfolio, we provide
            fast, professional Boiler Permit to Operate services throughout
            San Francisco.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {clients.map((client) => (
            <div
              key={client}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition duration-300 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
                  ✓
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {client}
                </h3>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}