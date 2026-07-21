import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getCurrentTenant } from "@/lib/currentTenant";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      address,
      boilers,
      requestType,
      message,
    } = body;

    if (!name || !phone || !email || !address) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;

    if (!contactEmail) {
      return NextResponse.json(
        { error: "Contact email is not configured." },
        { status: 500 },
      );
    }

    const boilerCount =
      boilers === "" || boilers === null || boilers === undefined
        ? null
        : Number(boilers);

    const tenant = await getCurrentTenant();

    const { error: databaseError } = await supabaseAdmin
      .from("leads")
      .insert({
        tenant_id: tenant.id,
        name,
        phone,
        email,
        address,
        boilers: boilerCount,
        request_type: requestType || null,
        message: message || null,
        status: "New",
      });

    if (databaseError) {
      console.error("Supabase insert error:", databaseError);

      return NextResponse.json(
        { error: "The request could not be saved." },
        { status: 500 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "SF Boiler Permits <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: email,
      subject: `New Boiler Permit Request — ${address}`,
      html: `
        <h2>New Boiler Permit Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Property Address:</strong> ${address}</p>
        <p><strong>Number of Boilers:</strong> ${
          boilers || "Not provided"
        }</p>
        <p><strong>Request Type:</strong> ${
          requestType || "Not provided"
        }</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          error:
            "The request was saved, but the email notification could not be sent.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Contact route error:", error);

    return NextResponse.json(
      { error: "Something went wrong while processing the request." },
      { status: 500 },
    );
  }
}