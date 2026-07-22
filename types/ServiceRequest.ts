export type ServiceRequestStatus =
  | "New"
  | "Assigned"
  | "Scheduled"
  | "In Progress"
  | "Waiting"
  | "Complete"
  | "Cancelled";

export type ServiceRequestPriority =
  | "Low"
  | "Normal"
  | "High"
  | "Emergency";

export interface ServiceRequest {
  id: number;

  tenant_id: number;

  customer_id: number | null;

  property_id: number | null;

  equipment_id: number | null;

  assigned_to: number | null;

  request_number: string | null;

  request_type: string;

  priority: ServiceRequestPriority;

  status: ServiceRequestStatus;

  description: string | null;

  created_at: string;
}