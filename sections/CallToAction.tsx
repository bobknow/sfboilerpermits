export default function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 px-6 py-24 text-white sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/boiler-room-hero.png')" }}
      />

      <div className="absolute inset-0 bg-slate-950/85" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
          Ready to Get Started?
        </p>

        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Need help with a San Francisco boiler permit?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Send us the property address and boiler information. We’ll review the
          request and explain the next step.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-md bg-emerald-600 px-8 py-4 text-center text-base font-bold text-white transition hover:bg-emerald-500"
          >
            Request Permit Help
          </a>

          <a
            href="tel:+14158317797"
            className="rounded-md border border-white/60 bg-white/10 px-8 py-4 text-center text-base font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-950"
          >
            Call (415) 831-7797
          </a>
        </div>
      </div>
    </section>
  );
}