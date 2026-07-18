const services = [
  {
    title: "Permit to Operate",
    description:
      "Applications for new and existing boilers, handled with the correct SF DBI documentation.",
  },
  {
    title: "Renewals & Expirations",
    description:
      "Help with annual renewals, expired permits, and outstanding boiler records.",
  },
  {
    title: "Corrections & Compliance",
    description:
      "Resubmittals, inspection corrections, violation support, and compliance assistance.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white px-6 py-20 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Our Services
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Boiler permit help without the guesswork
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            We help San Francisco property owners and managers move through the
            permit process clearly and efficiently.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl font-black text-emerald-700">
                ✓
              </div>

              <h3 className="text-xl font-bold">{service.title}</h3>

              <p className="mt-4 leading-7 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}