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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const { id } = await params;
    const requestId = Number(id);
    const body = await request.json();
    const { status } = body;

    if (!Number.isInteger(requestId) || requestId < 1) {
      return NextResponse.json(
        { error: "Invalid service request ID." },
        { status: 400 },
      );
    }

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid service request status." },
        { status: 400 },
      );
    }

    const tenant = await getCurrentTenant();

    const updateValues: {
      status: string;
      completed_at?: string | null;
    } = {
      status,
    };

    if (status === "Complete") {
      updateValues.completed_at = new Date().toISOString();
    } else {
      updateValues.completed_at = null;
    }

    const { data, error } = await supabaseAdmin
      .from("service_requests")
      .update(updateValues)
      .eq("id", requestId)
      .eq("tenant_id", tenant.id)
      .select(
        `
          id,
          request_number,
          request_type,
          priority,
          status,
          description,
          created_at,
          completed_at
        `,
      )
      .single();

    if (error) {
      console.error("Service request update error:", error);

      return NextResponse.json(
        { error: "The service request could not be updated." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      serviceRequest: data,
    });
  } catch (error) {
    console.error("Service request update route error:", error);

    return NextResponse.json(
      { error: "Unexpected error while updating the service request." },
      { status: 500 },
    );
  }
}