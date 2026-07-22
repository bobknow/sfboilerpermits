"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type QuickCreateType =
  | "lead"
  | "customer"
  | "property"
  | "equipment"
  | "permit"
  | "service-request"
  | "device";

type QuickCreatePanelProps = {
  open: boolean;
  selectedType: QuickCreateType | null;
  onSelectType: (type: QuickCreateType | null) => void;
  onClose: () => void;
};

const createOptions: {
  type: QuickCreateType;
  label: string;
  description: string;
}[] = [
  {
    type: "lead",
    label: "New Lead",
    description: "Capture a new sales or permit opportunity.",
  },
  {
    type: "customer",
    label: "New Customer",
    description: "Create a customer or property-management contact.",
  },
  {
    type: "property",
    label: "New Property",
    description: "Add a building to the company portfolio.",
  },
  {
    type: "equipment",
    label: "New Equipment",
    description: "Add a boiler, water heater, or monitored asset.",
  },
  {
    type: "permit",
    label: "New Permit",
    description: "Create a permit record and track its expiration.",
  },
  {
    type: "service-request",
    label: "New Service Request",
    description: "Create a service or inspection request.",
  },
  {
    type: "device",
    label: "Register Device",
    description: "Assign a BoilerWatch device to equipment.",
  },
];

export default function QuickCreatePanel({
  open,
  selectedType,
  onSelectType,
  onClose,
}: QuickCreatePanelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  const selectedOption = createOptions.find(
    (option) => option.type === selectedType,
  );

  return createPortal(
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        aria-label="Close quick create panel"
        onClick={onClose}
        className="absolute inset-0 bg-black/75"
      />

      <aside className="absolute right-0 top-0 z-10 flex h-full w-full max-w-2xl flex-col border-l border-slate-700 bg-slate-950 shadow-2xl">
        <header className="flex items-start justify-between gap-5 border-b border-slate-800 px-6 py-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Quick Create
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              {selectedOption ? selectedOption.label : "Add something new"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {selectedOption
                ? selectedOption.description
                : "Choose the record you want to create."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick create panel"
            className="rounded-lg border border-slate-700 px-3 py-2 font-bold text-slate-400 transition hover:border-slate-500 hover:text-white"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {!selectedOption ? (
            <div className="grid gap-3">
              {createOptions.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => onSelectType(option.type)}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-emerald-600"
                >
                  <p className="font-black text-white">{option.label}</p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => onSelectType(null)}
                className="text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
              >
                ← Back to Quick Create
              </button>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="text-2xl font-black text-white">
                  {selectedOption.label}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {selectedOption.description}
                </p>

                <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950 p-6 text-center">
                  <p className="font-bold text-slate-200">Form coming next</p>

                  <p className="mt-2 text-sm text-slate-500">
                    The drawer is ready for the complete form.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>,
    document.body,
  );
}