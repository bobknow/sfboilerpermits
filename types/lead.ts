export type LeadStatus =
  | "New"
  | "Contacted"
  | "Scheduled"
  | "Complete"
  | "Converted"
  | "Lost";

export type Lead = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  boilers: number | null;
  request_type: string | null;
  message: string | null;
  status: LeadStatus;
};