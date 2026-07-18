export default function WhyUs() {
  const items = [
    "SF DBI Registered Contractor",
    "Licensed C-4 & C-36 Contractor",
    "Fast Permit Turnaround",
    "Commercial & Residential",
    "Single Boiler or Entire Building",
    "Serving San Francisco Only",
  ];

  return (
    <section className="bg-slate-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <p className="uppercase tracking-[.25em] text-emerald-400 font-semibold">
              Why Choose Us
            </p>

            <h2 className="text-4xl font-black mt-4">
              Boiler permits are all we do.
            </h2>

            <p className="mt-6 text-slate-300 leading-8 text-lg">
              We specialize in San Francisco Boiler Permit to Operate
              applications, renewals and compliance. No call centers.
              No guessing. Just experienced permit professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">

            {items.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-700 bg-slate-800 p-5"
              >
                <span className="text-emerald-400 text-xl">✓</span>

                <p className="mt-3 font-medium">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}