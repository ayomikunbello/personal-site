"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function fields(formData: FormData) {
  return {
    date_label: String(formData.get("date_label") ?? "").trim(),
    text: String(formData.get("text") ?? "").trim(),
    href: String(formData.get("href") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createHighlight(formData: FormData) {
  const supabase = await createClient();
  const values = fields(formData);
  if (!values.text || !values.date_label) return { error: "Date and text are required." };

  const { error } = await supabase.from("highlights").insert(values);
  if (error) return { error: error.message };

  revalidatePath("/admin/highlights");
  revalidatePath("/");
  return { error: null };
}

export async function updateHighlight(id: string, formData: FormData) {
  const supabase = await createClient();
  const values = fields(formData);
  if (!values.text || !values.date_label) return { error: "Date and text are required." };

  const { error } = await supabase.from("highlights").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/highlights");
  revalidatePath("/");
  return { error: null };
}

export async function deleteHighlight(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("highlights").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/highlights");
  revalidatePath("/");
  return { error: null };
}
