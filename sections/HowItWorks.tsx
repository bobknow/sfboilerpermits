const steps = [
  {
    number: "01",
    title: "Contact Us",
    description:
      "Call, text, or submit your property and boiler information online.",
  },
  {
    number: "02",
    title: "We Review",
    description:
      "We verify the building, equipment details, and current permit status.",
  },
  {
    number: "03",
    title: "Permit Processing",
    description:
      "We prepare the required documentation and handle the permit process.",
  },
  {
    number: "04",
    title: "Stay Compliant",
    description:
      "You receive confirmation, next steps, and support for future renewals.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="process"
      className="bg-slate-50 px-6 py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            How It Works
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Simple process. Clear next steps.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            We keep the permit process organized from the first request through
            confirmation and future renewal support.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-black text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                {step.number}
              </div>

              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>

              <p className="mt-4 leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}