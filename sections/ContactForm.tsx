"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          address: formData.get("address"),
          boilers: formData.get("boilers"),
          requestType: formData.get("requestType"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "The request could not be submitted.");
      }

      setStatus("success");
      setMessage(
        "Your request was received. We’ll review it and contact you shortly.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please call us directly.",
      );
    }
  }

  return (
    <section id="contact" className="bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Contact Us
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Request boiler permit assistance.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Have one boiler or an entire portfolio? Send us the property details
            and we’ll review the request and contact you with the next step.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Licensed C-4 Contractor",
              "SF DBI Registered",
              "Fast Response",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-slate-700"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                  ✓
                </span>
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>

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
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
        >
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
            disabled={status === "submitting"}
            className="mt-8 w-full rounded-xl bg-emerald-600 px-8 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-emerald-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? "Sending Request..."
              : "Submit Permit Request"}
          </button>

          {message && (
            <p
              role="status"
              className={`mt-4 rounded-md px-4 py-3 text-sm font-semibold ${
                status === "success"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}