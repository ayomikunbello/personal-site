"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markMessageRead(id: string, read: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").update({ read }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { error: null };
}
