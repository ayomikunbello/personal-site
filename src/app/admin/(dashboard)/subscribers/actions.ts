"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addSubscriber(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "Email is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("subscribers").insert({ name: name || null, email });

  if (error) return { error: error.message.includes("duplicate") ? "Already subscribed." : error.message };
  revalidatePath("/admin/subscribers");
  return { error: null };
}

export async function removeSubscriber(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("subscribers").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/subscribers");
  return { error: null };
}
