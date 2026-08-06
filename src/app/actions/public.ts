"use server";

import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail, sendContactNotification } from "@/lib/email";

export async function subscribeNewsletter(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) return { error: "Enter a valid email address." };

  const supabase = await createClient();
  const { error } = await supabase.from("subscribers").insert({ name: name || null, email });

  if (error) {
    if (error.message.includes("duplicate")) {
      return { error: "You're already subscribed — thanks!" };
    }
    return { error: "Something went wrong. Please try again." };
  }

  await sendWelcomeEmail(email, name || undefined);

  return { error: null };
}

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) return { error: "Please fill in every field." };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({ name, email, message });

  if (error) return { error: "Something went wrong. Please try again." };

  await sendContactNotification(name, email, message);

  return { error: null };
}
