import { getCurrentTenant } from "@/lib/currentTenant";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

const validStatuses = [
  "New",
  "Assigned",
  "Scheduled",
  "In Progress",
  "Waiting",
  "Complete",
  "Cancelled",
];

const validPriorities = ["Low", "Normal", "High", "Emergency"];

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const body = await request.json();

    const {
      customerId,
      propertyId,
      equipmentId,
      requestType,
      priority,
      status,
      description,
    } = body;

    const parsedCustomerId =
      customerId === null || customerId === ""
        ? null
        : Number(customerId);

    const parsedPropertyId =
      propertyId === null || propertyId === ""
        ? null
        : Number(propertyId);

    const parsedEquipmentId =
      equipmentId === null || equipmentId === ""
        ? null
        : Number(equipmentId);

    if (
      parsedCustomerId !== null &&
      (!Number.isInteger(parsedCustomerId) || parsedCustomerId < 1)
    ) {
      return NextResponse.json(
        { error: "Invalid customer." },
        { status: 400 },
      );
    }

    if (
      parsedPropertyId !== null &&
      (!Number.isInteger(parsedPropertyId) || parsedPropertyId < 1)
    ) {
      return NextResponse.json(
        { error: "Invalid property." },
        { status: 400 },
      );
    }

    if (
      parsedEquipmentId !== null &&
      (!Number.isInteger(parsedEquipmentId) || parsedEquipmentId < 1)
    ) {
      return NextResponse.json(
        { error: "Invalid equipment." },
        { status: 400 },
      );
    }

    if (!requestType || typeof requestType !== "string") {
      return NextResponse.json(
        { error: "Request type is required." },
        { status: 400 },
      );
    }

    const normalizedPriority = validPriorities.includes(priority)
      ? priority
      : "Normal";

    const normalizedStatus = validStatuses.includes(status)
      ? status
      : "New";

    const tenant = await getCurrentTenant();

    const requestNumber = `SR-${Date.now()}`;

    const { data, error } = await supabaseAdmin
      .from("service_requests")
      .insert({
        tenant_id: tenant.id,
        customer_id: parsedCustomerId,
        property_id: parsedPropertyId,
        equipment_id: parsedEquipmentId,
        request_number: requestNumber,
        request_type: requestType.trim(),
        priority: normalizedPriority,
        status: normalizedStatus,
        description:
          typeof description === "string" && description.trim()
            ? description.trim()
            : null,
      })
      .select(
        `
          id,
          tenant_id,
          customer_id,
          property_id,
          equipment_id,
          request_number,
          request_type,
          priority,
          status,
          description,
          created_at
        `,
      )
      .single();

    if (error) {
      console.error("Service request creation error:", error);

      return NextResponse.json(
        { error: "The service request could not be created." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      serviceRequest: data,
    });
  } catch (error) {
    console.error("Service request API error:", error);

    return NextResponse.json(
      { error: "Unexpected error while creating the service request." },
      { status: 500 },
    );
  }
}