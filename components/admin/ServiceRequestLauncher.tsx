"use client";

import { useState } from "react";
import NewServiceRequestModal from "@/components/admin/NewServiceRequestModal";

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

type ServiceRequestLauncherProps = {
  customers: CustomerOption[];
  properties: PropertyOption[];
  equipment: EquipmentOption[];
};

export default function ServiceRequestLauncher({
  customers,
  properties,
  equipment,
}: ServiceRequestLauncherProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-500"
      >
        + New Service Request
      </button>

      <NewServiceRequestModal
        open={open}
        customers={customers}
        properties={properties}
        equipment={equipment}
        onClose={() => setOpen(false)}
      />
    </>
  );
}