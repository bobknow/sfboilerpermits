import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const { id } = await params;
    const leadId = Number(id);

    if (!Number.isInteger(leadId) || leadId < 1) {
      return NextResponse.json(
        { error: "Invalid lead ID." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin.rpc("convert_lead", {
      p_lead_id: leadId,
    });

    if (error) {
      console.error("Lead conversion error:", error);

      const message = error.message.includes("already been converted")
        ? "This lead has already been converted."
        : "The lead could not be converted.";

      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      conversion: data,
    });
  } catch (error) {
    console.error("Convert lead route error:", error);

    return NextResponse.json(
      { error: "Unexpected error while converting the lead." },
      { status: 500 },
    );
  }
}