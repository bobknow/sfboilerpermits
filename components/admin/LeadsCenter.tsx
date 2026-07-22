"use client";

import LeadsDashboard from "@/components/admin/LeadsDashboard";
import type { Lead } from "@/types/lead";

type LeadsCenterProps = {
  leads: Lead[];
};

export default function LeadsCenter({ leads }: LeadsCenterProps) {
  return <LeadsDashboard leads={leads} />;
}