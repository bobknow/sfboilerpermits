"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AddEquipmentFormProps = {
  propertyId: number;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function AddEquipmentForm({
  propertyId,
}: AddEquipmentFormProps) {
  const router = useRouter();

  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/equipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          displayName: formData.get("displayName"),
          equipmentType: formData.get("equipmentType"),
          manufacturer: formData.get("manufacturer"),
          model: formData.get("model"),
          serialNumber: formData.get("serialNumber"),
          fuelType: formData.get("fuelType"),
          capacityBtu: formData.get("capacityBtu"),
          installationYear: formData.get("installationYear"),
          locationDescription: formData.get("locationDescription"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to add equipment.");
      }

      setStatus("success");
      setMessage("Equipment added successfully.");
      form.reset();
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while adding equipment.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
          Add Equipment
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          Add a boiler or monitored asset
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Start with the basic equipment record. We can add permits, sensors,
          devices, and monitoring details afterward.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Display Name
          </span>

          <input
            type="text"
            name="displayName"
            required
            placeholder="Boiler #1"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Equipment Type
          </span>

          <select
            name="equipmentType"
            required
            defaultValue="Boiler"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="Boiler">Boiler</option>
            <option value="Water Heater">Water Heater</option>
            <option value="Heat Pump">Heat Pump</option>
            <option value="Heat Pump Water Heater">
              Heat Pump Water Heater
            </option>
            <option value="HVAC">HVAC</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Manufacturer
          </span>

          <input
            type="text"
            name="manufacturer"
            placeholder="Cleaver-Brooks"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">Model</span>

          <input
            type="text"
            name="model"
            placeholder="Model number"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Serial Number
          </span>

          <input
            type="text"
            name="serialNumber"
            placeholder="Serial number"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Fuel Type
          </span>

          <select
            name="fuelType"
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Not provided</option>
            <option value="Natural Gas">Natural Gas</option>
            <option value="Electric">Electric</option>
            <option value="Oil">Oil</option>
            <option value="Dual Fuel">Dual Fuel</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Capacity (BTU)
          </span>

          <input
            type="number"
            name="capacityBtu"
            min="0"
            placeholder="Example: 1000000"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">
            Installation Year
          </span>

          <input
            type="number"
            name="installationYear"
            min="1800"
            max={new Date().getFullYear() + 1}
            placeholder="Example: 2018"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-semibold text-slate-300">
            Equipment Location
          </span>

          <input
            type="text"
            name="locationDescription"
            placeholder="Basement mechanical room"
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "submitting" ? "Adding Equipment..." : "Add Equipment"}
      </button>

      {message && (
        <p
          role="status"
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${
            status === "success"
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-red-400/10 text-red-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}