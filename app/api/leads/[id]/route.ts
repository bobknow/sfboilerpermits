import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

const validStatuses = [
  "New",
  "Contacted",
  "Scheduled",
  "Complete",
  "Lost",
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
    const { status } = await request.json();

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status." },
        { status: 400 },
      );
    }

    const leadId = Number(id);

    if (!Number.isInteger(leadId) || leadId < 1) {
      return NextResponse.json(
        { error: "Invalid lead ID." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .update({ status })
      .eq("id", leadId)
      .select("id, status")
      .single();

    if (error) {
      console.error("Lead status update error:", error);

      return NextResponse.json(
        { error: "Unable to update lead." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (error) {
    console.error("Lead status route error:", error);

    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 },
    );
  }
}