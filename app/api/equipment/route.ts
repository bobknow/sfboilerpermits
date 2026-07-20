import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const body = await request.json();

    const {
      propertyId,
      displayName,
      equipmentType,
      manufacturer,
      model,
      serialNumber,
      fuelType,
      capacityBtu,
      installationYear,
      locationDescription,
    } = body;

    const parsedPropertyId = Number(propertyId);

    if (!Number.isInteger(parsedPropertyId) || parsedPropertyId < 1) {
      return NextResponse.json(
        { error: "A valid property is required." },
        { status: 400 },
      );
    }

    if (!displayName || !equipmentType) {
      return NextResponse.json(
        { error: "Equipment name and type are required." },
        { status: 400 },
      );
    }

    const parsedCapacity =
      capacityBtu === "" || capacityBtu === null
        ? null
        : Number(capacityBtu);

    const parsedYear =
      installationYear === "" || installationYear === null
        ? null
        : Number(installationYear);

    if (
      parsedCapacity !== null &&
      (!Number.isFinite(parsedCapacity) || parsedCapacity < 0)
    ) {
      return NextResponse.json(
        { error: "BTU capacity must be a valid number." },
        { status: 400 },
      );
    }

    if (
      parsedYear !== null &&
      (!Number.isInteger(parsedYear) ||
        parsedYear < 1800 ||
        parsedYear > new Date().getFullYear() + 1)
    ) {
      return NextResponse.json(
        { error: "Installation year is invalid." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("equipment")
      .insert({
        property_id: parsedPropertyId,
        display_name: displayName.trim(),
        equipment_type: equipmentType,
        manufacturer: manufacturer?.trim() || null,
        model: model?.trim() || null,
        serial_number: serialNumber?.trim() || null,
        fuel_type: fuelType || null,
        capacity_btu: parsedCapacity,
        installation_year: parsedYear,
        location_description: locationDescription?.trim() || null,
        operational_status: "Unknown",
      })
      .select(
        `
          id,
          property_id,
          display_name,
          equipment_type,
          manufacturer,
          model,
          serial_number,
          operational_status
        `,
      )
      .single();

    if (error) {
      console.error("Equipment creation error:", error);

      return NextResponse.json(
        { error: "The equipment could not be created." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      equipment: data,
    });
  } catch (error) {
    console.error("Equipment API error:", error);

    return NextResponse.json(
      { error: "Unexpected error while creating equipment." },
      { status: 500 },
    );
  }
}