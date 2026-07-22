"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CustomerOption = {
  id: number;
  name: string;
};

type PropertyOption = {
  id: number;
  primary_contact_id: number | null;
  address_line_1: string;
};

type EquipmentOption = {
  id: number;
  property_id: number;
  display_name: string;
};

type NewServiceRequestModalProps = {
  open: boolean;
  customers: CustomerOption[];
  properties: PropertyOption[];
  equipment: EquipmentOption[];
  onClose: () => void;
};

type FormStatus = "idle" | "submitting" | "error";

export default function NewServiceRequestModal({
  open,
  customers,
  properties,
  equipment,
  onClose,
}: NewServiceRequestModalProps) {
  const router = useRouter();

  const [customerId, setCustomerId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredProperties = useMemo(() => {
    if (!customerId) {
      return properties;
    }

    return properties.filter(
      (property) => property.primary_contact_id === Number(customerId),
    );
  }, [customerId, properties]);

  const filteredEquipment = useMemo(() => {
    if (!propertyId) {
      return [];
    }

    return equipment.filter(
      (item) => item.property_id === Number(propertyId),
    );
  }, [equipment, propertyId]);

  function resetForm() {
    setCustomerId("");
    setPropertyId("");
    setStatus("idle");
    setErrorMessage("");
  }

  function closeModal() {
    if (status === "submitting") {
      return;
    }

    resetForm();
    onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: formData.get("customerId"),
          propertyId: formData.get("propertyId"),
          equipmentId: formData.get("equipmentId"),
          requestType: formData.get("requestType"),
          priority: formData.get("priority"),
          status: "New",
          description: formData.get("description"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to create the service request.",
        );
      }

      form.reset();
      resetForm();
      onClose();
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create the service request.",
      );
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 px-5 py-8">
      <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Service
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              New Service Request
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Connect the request to a customer, property, and piece of
              equipment.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-slate-700 px-3 py-2 font-bold text-slate-400 transition hover:border-slate-500 hover:text-white"
            aria-label="Close service request form"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Customer
              </span>

              <select
                name="customerId"
                value={customerId}
                onChange={(event) => {
                  setCustomerId(event.target.value);
                  setPropertyId("");
                }}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              >
                <option value="">Not assigned</option>

                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Property
              </span>

              <select
                name="propertyId"
                value={propertyId}
                onChange={(event) => setPropertyId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              >
                <option value="">Not assigned</option>

                {filteredProperties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.address_line_1}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Equipment
              </span>

              <select
                name="equipmentId"
                disabled={!propertyId}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500 disabled:opacity-50"
              >
                <option value="">Not assigned</option>

                {filteredEquipment.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.display_name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-300">
                Priority
              </span>

              <select
                name="priority"
                defaultValue="Normal"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Emergency">Emergency</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold text-slate-300">
                Request Type
              </span>

              <input
                type="text"
                name="requestType"
                required
                placeholder="Boiler repair, PTO inspection, no heat..."
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold text-slate-300">
                Description
              </span>

              <textarea
                name="description"
                rows={5}
                placeholder="Describe the problem, access details, or customer request."
                className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
              />
            </label>
          </div>

          {errorMessage && (
            <div className="mt-5 rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm font-semibold text-red-200">
              {errorMessage}
            </div>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeModal}
              disabled={status === "submitting"}
              className="rounded-xl border border-slate-700 px-5 py-3 font-bold text-slate-300 transition hover:border-slate-500 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60"
            >
              {status === "submitting"
                ? "Creating Request..."
                : "Create Service Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}