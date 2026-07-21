import { supabaseAdmin } from "@/lib/supabaseAdmin";

const DEFAULT_TENANT_SLUG = "sf-boiler-permits";

export async function getCurrentTenant() {
  const { data, error } = await supabaseAdmin
    .from("tenants")
    .select(
      `
        id,
        name,
        slug,
        tenant_type,
        logo_url,
        primary_color,
        secondary_color,
        white_label_enabled,
        is_active
      `,
    )
    .eq("slug", DEFAULT_TENANT_SLUG)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    console.error("Current tenant lookup error:", error);
    throw new Error("The active company account could not be loaded.");
  }

  return data;
}