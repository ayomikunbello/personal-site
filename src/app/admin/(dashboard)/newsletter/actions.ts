"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendNewsletterBroadcast, sendTestEmail } from "@/lib/email";

type ComposerInput = {
  subject: string;
  previewText: string;
  bodyHtml: string;
};

function readComposer(formData: FormData): ComposerInput {
  return {
    subject: String(formData.get("subject") ?? "").trim(),
    previewText: String(formData.get("previewText") ?? "").trim(),
    bodyHtml: String(formData.get("bodyHtml") ?? "").trim(),
  };
}

export async function saveDraft(formData: FormData) {
  const input = readComposer(formData);
  if (!input.subject) return { error: "Subject is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_sends").insert({
    subject: input.subject,
    preview_text: input.previewText || null,
    body_html: input.bodyHtml,
    status: "draft",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/newsletter");
  return { error: null };
}

export async function sendTest(formData: FormData) {
  const input = readComposer(formData);
  if (!input.subject || !input.bodyHtml) return { error: "Subject and body are required." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return { error: "Couldn't determine your admin email." };

  const result = await sendTestEmail(user.email, {
    subject: input.subject,
    bodyHtml: input.bodyHtml,
    previewText: input.previewText,
  });

  if ("skipped" in result && result.skipped) {
    return { error: `Not sent: ${result.reason}.` };
  }
  if (result.error) return { error: result.error };

  return { error: null, sentTo: user.email };
}

export async function sendOrSchedule(formData: FormData) {
  const input = readComposer(formData);
  const scheduledAtRaw = String(formData.get("scheduledAt") ?? "").trim();

  if (!input.subject || !input.bodyHtml) return { error: "Subject and body are required." };

  const supabase = await createClient();
  const { data: subscribers, error: fetchError } = await supabase
    .from("subscribers")
    .select("email");

  if (fetchError) return { error: fetchError.message };

  const recipients = (subscribers ?? []).map((s) => s.email);
  const scheduledAt = scheduledAtRaw ? new Date(scheduledAtRaw).toISOString() : undefined;

  const result = await sendNewsletterBroadcast(recipients, {
    subject: input.subject,
    bodyHtml: input.bodyHtml,
    previewText: input.previewText,
    scheduledAt,
  });

  if ("skipped" in result && result.skipped) {
    return { error: `Not sent: ${result.reason}. Add RESEND_API_KEY to send for real.` };
  }
  if (result.error) return { error: result.error };

  const { error: logError } = await supabase.from("newsletter_sends").insert({
    subject: input.subject,
    preview_text: input.previewText || null,
    body_html: input.bodyHtml,
    recipient_count: recipients.length,
    status: scheduledAt ? "scheduled" : "sent",
    scheduled_at: scheduledAt || null,
    sent_at: scheduledAt ? null : new Date().toISOString(),
    resend_ids: result.ids ?? null,
  });

  if (logError) return { error: logError.message };

  revalidatePath("/admin/newsletter");
  return { error: null, count: recipients.length, scheduled: Boolean(scheduledAt) };
}

export async function deleteDraft(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_sends").delete().eq("id", id).eq("status", "draft");
  if (error) return { error: error.message };
  revalidatePath("/admin/newsletter");
  return { error: null };
}
