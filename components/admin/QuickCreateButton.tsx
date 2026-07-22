"use client";

import { useState } from "react";
import QuickCreatePanel from "@/components/admin/QuickCreatePanel";

type QuickCreateType =
  | "lead"
  | "customer"
  | "property"
  | "equipment"
  | "permit"
  | "service-request"
  | "device";

export default function QuickCreateButton() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<QuickCreateType | null>(null);

  function closePanel() {
    setOpen(false);
    setSelectedType(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-bold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-400"
      >
        + Quick Create
      </button>

      <QuickCreatePanel
        open={open}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        onClose={closePanel}
      />
    </>
  );
}