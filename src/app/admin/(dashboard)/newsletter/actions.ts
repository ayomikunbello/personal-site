"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sendNewsletterBatch, sendTestEmail } from "@/lib/email";
import { renderBlocksToHtml, type Block } from "@/lib/newsletterBlocks";

type ComposerInput = {
  subject: string;
  previewText: string;
  blocks: Block[];
  groupId: string | null;
};

function readComposer(formData: FormData): ComposerInput {
  const blocksRaw = String(formData.get("blocks") ?? "[]");
  const groupId = String(formData.get("groupId") ?? "").trim();
  return {
    subject: String(formData.get("subject") ?? "").trim(),
    previewText: String(formData.get("previewText") ?? "").trim(),
    blocks: JSON.parse(blocksRaw) as Block[],
    groupId: groupId || null,
  };
}

async function getRecipients(groupId: string | null) {
  const supabase = await createClient();

  if (!groupId) {
    const { data } = await supabase.from("subscribers").select("id, email, name");
    return (data ?? []).map((s) => ({ email: s.email, subscriberId: s.id, name: s.name }));
  }

  const { data } = await supabase
    .from("subscriber_group_members")
    .select("subscriber_id, subscribers(id, email, name)")
    .eq("group_id", groupId);

  return (data ?? [])
    .map((row) => row.subscribers as unknown as { id: string; email: string; name: string | null } | null)
    .filter((s): s is { id: string; email: string; name: string | null } => Boolean(s))
    .map((s) => ({ email: s.email, subscriberId: s.id, name: s.name }));
}

export async function saveDraft(formData: FormData) {
  const input = readComposer(formData);
  if (!input.subject) return { error: "Subject is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_sends").insert({
    subject: input.subject,
    preview_text: input.previewText || null,
    body_blocks: input.blocks,
    body_html: renderBlocksToHtml(input.blocks),
    group_id: input.groupId,
    status: "draft",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/newsletter");
  return { error: null };
}

export async function sendTest(formData: FormData) {
  const input = readComposer(formData);
  if (!input.subject || input.blocks.length === 0) return { error: "Subject and body are required." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return { error: "Couldn't determine your admin email." };

  const result = await sendTestEmail(user.email, {
    subject: input.subject,
    blocks: input.blocks,
    previewText: input.previewText,
  });

  if ("skipped" in result && result.skipped) return { error: `Not sent: ${result.reason}.` };
  if (result.error) return { error: result.error };

  return { error: null, sentTo: user.email };
}

export async function sendOrSchedule(formData: FormData) {
  const input = readComposer(formData);
  const scheduledAtRaw = String(formData.get("scheduledAt") ?? "").trim();

  if (!input.subject || input.blocks.length === 0) return { error: "Subject and body are required." };

  const recipients = await getRecipients(input.groupId);
  const scheduledAt = scheduledAtRaw ? new Date(scheduledAtRaw).toISOString() : undefined;

  const result = await sendNewsletterBatch(recipients, {
    subject: input.subject,
    blocks: input.blocks,
    previewText: input.previewText,
    scheduledAt,
  });

  if ("skipped" in result && result.skipped) {
    return { error: `Not sent: ${result.reason}. Add RESEND_API_KEY to send for real.` };
  }
  if (result.error) return { error: result.error };

  const supabase = await createClient();
  const { data: campaign, error: logError } = await supabase
    .from("newsletter_sends")
    .insert({
      subject: input.subject,
      preview_text: input.previewText || null,
      body_blocks: input.blocks,
      body_html: renderBlocksToHtml(input.blocks),
      group_id: input.groupId,
      recipient_count: recipients.length,
      status: scheduledAt ? "scheduled" : "sent",
      scheduled_at: scheduledAt || null,
      sent_at: scheduledAt ? null : new Date().toISOString(),
    })
    .select("id")
    .single();

  if (logError) return { error: logError.message };

  if (result.results.length > 0) {
    await supabase.from("newsletter_recipients").insert(
      result.results.map((r) => ({
        campaign_id: campaign.id,
        subscriber_id: r.subscriberId,
        email: r.email,
        resend_email_id: r.resendId,
      }))
    );
  }

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
