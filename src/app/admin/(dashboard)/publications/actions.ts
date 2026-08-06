"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createPublication(formData: FormData) {
  const supabase = await createClient();
  const type = String(formData.get("type"));
  const text = String(formData.get("text") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!text) return { error: "Text is required." };

  const { error } = await supabase
    .from("publications")
    .insert({ type, text, href: href || null, sort_order });

  if (error) return { error: error.message };

  revalidatePath("/admin/publications");
  revalidatePath("/portfolio");
  return { error: null };
}

export async function updatePublication(id: string, formData: FormData) {
  const supabase = await createClient();
  const text = String(formData.get("text") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!text) return { error: "Text is required." };

  const { error } = await supabase
    .from("publications")
    .update({ text, href: href || null, sort_order })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/publications");
  revalidatePath("/portfolio");
  return { error: null };
}

export async function deletePublication(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("publications").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/publications");
  revalidatePath("/portfolio");
  return { error: null };
}
