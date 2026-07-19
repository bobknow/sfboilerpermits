export default function ContactForm() {
  return (
    <section id="contact" className="bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Contact Us
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Tell us about the property.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Send the property address, number of boilers, and a brief
            description of what you need. We’ll review the request and follow
            up with the next step.
          </p>

          <div className="mt-8 space-y-3 text-slate-700">
            <p>
              <strong>Phone:</strong>{" "}
              <a className="text-emerald-700" href="tel:+14158317797">
                (415) 831-7797
              </a>
            </p>

            <p>
              <strong>Service area:</strong> San Francisco
            </p>

            <p>
              <strong>Services:</strong> Permit applications, renewals,
              inspections, corrections, and compliance support
            </p>
          </div>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold">Name</span>
              <input
                type="text"
                name="name"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Phone</span>
              <input
                type="tel"
                name="phone"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Email</span>
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Property Address</span>
              <input
                type="text"
                name="address"
                required
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Number of Boilers</span>
              <input
                type="number"
                name="boilers"
                min="1"
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Request Type</span>
              <select
                name="requestType"
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                <option>New Permit</option>
                <option>Renewal</option>
                <option>Expired Permit</option>
                <option>DBI Notice</option>
                <option>Inspection or Repair</option>
                <option>Not Sure</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Message</span>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-emerald-600 px-6 py-5 font-bold text-white transition hover:bg-emerald-500"
          >
            Submit Permit Request
          </button>

          <p className="mt-4 text-sm text-slate-500">
            The form is visual only for now. We’ll connect email delivery and
            secure submission handling next.
          </p>
        </form>
      </div>
    </section>
  );
}