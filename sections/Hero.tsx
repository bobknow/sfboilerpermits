export default function Hero() {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/boiler-room-hero.png')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
            Licensed C-4 Contractor · San Francisco
          </p>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            San Francisco
            <span className="block text-emerald-400">
              Boiler Permit Specialists
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Permit to Operate applications, renewals, inspections, corrections,
            and SF DBI compliance support for commercial and residential
            properties.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-md bg-emerald-600 px-7 py-4 text-center text-base font-bold text-white transition hover:bg-emerald-500"
            >
              Request Permit Help
            </a>

            <a
              href="tel:+14158317797"
              className="rounded-md border border-white/60 bg-white/10 px-7 py-4 text-center text-base font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
            >
              Call (415) 831-7797
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 text-sm text-slate-200 sm:grid-cols-3">
            <div className="border-l-2 border-emerald-400 pl-3">
              C-4 Licensed
            </div>
            <div className="border-l-2 border-emerald-400 pl-3">
              SF DBI Registered
            </div>
            <div className="border-l-2 border-emerald-400 pl-3">
              San Francisco Only
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}