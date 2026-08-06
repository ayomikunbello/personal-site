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

export async function createGroup(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("subscriber_groups").insert({ name });
  if (error) return { error: error.message };
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin/newsletter");
  return { error: null };
}

export async function deleteGroup(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("subscriber_groups").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/subscribers");
  revalidatePath("/admin/newsletter");
  return { error: null };
}

export async function setSubscriberGroup(subscriberId: string, groupId: string, inGroup: boolean) {
  const supabase = await createClient();
  const { error } = inGroup
    ? await supabase.from("subscriber_group_members").insert({ subscriber_id: subscriberId, group_id: groupId })
    : await supabase
        .from("subscriber_group_members")
        .delete()
        .eq("subscriber_id", subscriberId)
        .eq("group_id", groupId);

  if (error) return { error: error.message };
  revalidatePath("/admin/subscribers");
  return { error: null };
}
