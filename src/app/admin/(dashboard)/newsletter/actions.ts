"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendNewsletterBroadcast } from "@/lib/email";

export async function sendNewsletter(formData: FormData) {
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!subject || !body) return { error: "Subject and body are required." };

  const supabase = await createClient();
  const { data: subscribers, error: fetchError } = await supabase
    .from("subscribers")
    .select("email");

  if (fetchError) return { error: fetchError.message };

  const recipients = (subscribers ?? []).map((s) => s.email);
  const result = await sendNewsletterBroadcast(recipients, subject, body);

  if ("skipped" in result && result.skipped) {
    return { error: `Not sent: ${result.reason}. Add RESEND_API_KEY to send for real.` };
  }

  const { error: logError } = await supabase
    .from("newsletter_sends")
    .insert({ subject, body, recipient_count: recipients.length });

  if (logError) return { error: logError.message };

  revalidatePath("/admin/newsletter");
  return { error: null, count: recipients.length };
}
