export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-12 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-black text-white">
            SF Boiler Permits
          </h2>

          <p className="mt-4 max-w-sm leading-7 text-slate-400">
            San Francisco Boiler Permit to Operate applications, renewals,
            inspections, corrections, and compliance support.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Contact</h3>

          <div className="mt-4 space-y-2 text-slate-400">
            <p>
              <a href="tel:+14158317797" className="hover:text-white">
                (415) 831-7797
              </a>
            </p>

            <p>Serving San Francisco only</p>
            <p>California Contractor License #1018989</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Services</h3>

          <div className="mt-4 space-y-2 text-slate-400">
            <p>Permit to Operate</p>
            <p>Renewals and Expirations</p>
            <p>Corrections and Compliance</p>
            <p>Boiler Inspections</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 SF Boiler Permits. All rights reserved.</p>

        <p>
          Permit approval remains subject to San Francisco DBI review.
        </p>
      </div>
    </footer>
  );
}