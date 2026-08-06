import { Resend } from "resend";
import { siteConfig } from "@/lib/data";
import { renderNewsletterEmail } from "@/lib/emailTemplate";
import { renderBlocksToHtml, type Block } from "@/lib/newsletterBlocks";

// FROM_EMAIL should be on a domain verified in Resend. Until that's set up,
// emails fall back to Resend's shared onboarding address so sending still
// works in the meantime.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendWelcomeEmail(to: string, name?: string) {
  const resend = getResend();
  if (!resend) return { skipped: true, reason: "RESEND_API_KEY not set" };

  const greeting = name ? `Hi ${name},` : "Hi there,";

  return resend.emails.send({
    from: `${siteConfig.name} <${FROM_EMAIL}>`,
    to,
    subject: `Welcome to my newsletter`,
    text: `${greeting}\n\nThanks for subscribing! Once a month I'll send you an email with what I'm up to and a few things I've learnt.\n\n— ${siteConfig.name}`,
  });
}

export async function sendContactNotification(name: string, email: string, message: string) {
  const resend = getResend();
  if (!resend) return { skipped: true, reason: "RESEND_API_KEY not set" };

  return resend.emails.send({
    from: `${siteConfig.name} site <${FROM_EMAIL}>`,
    to: siteConfig.emails[0],
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `${name} (${email}) wrote:\n\n${message}`,
  });
}

type CampaignInput = {
  subject: string;
  blocks: Block[];
  previewText?: string;
  scheduledAt?: string; // ISO string; if set, Resend sends it at this time instead of immediately
};

export async function sendTestEmail(to: string, input: CampaignInput) {
  const resend = getResend();
  if (!resend) return { skipped: true as const, reason: "RESEND_API_KEY not set" };

  const html = renderNewsletterEmail({
    bodyHtml: renderBlocksToHtml(input.blocks, "Friend"),
    previewText: input.previewText,
  });

  const result = await resend.emails.send({
    from: `${siteConfig.name} <${FROM_EMAIL}>`,
    to,
    subject: `[Test] ${input.subject}`,
    html,
  });

  if (result.error) return { skipped: false as const, error: result.error.message };
  return { skipped: false as const, error: null };
}

export type Recipient = { email: string; subscriberId: string | null; name?: string | null };
export type RecipientResult = { email: string; subscriberId: string | null; resendId: string | null };

/**
 * Sends one individual email per recipient (via Resend's batch API) so each
 * can be tracked separately for open/click analytics. Personalizes
 * {$firstname} per recipient.
 */
export async function sendNewsletterBatch(recipients: Recipient[], input: CampaignInput) {
  const resend = getResend();
  if (!resend) return { skipped: true as const, reason: "RESEND_API_KEY not set" };
  if (recipients.length === 0) return { skipped: true as const, reason: "No subscribers" };

  const payload = recipients.map((r) => ({
    from: `${siteConfig.name} <${FROM_EMAIL}>`,
    to: r.email,
    subject: input.subject,
    html: renderNewsletterEmail({
      bodyHtml: renderBlocksToHtml(input.blocks, r.name),
      previewText: input.previewText,
    }),
    ...(input.scheduledAt ? { scheduledAt: input.scheduledAt } : {}),
  }));

  const results: RecipientResult[] = [];
  for (let i = 0; i < payload.length; i += 100) {
    const chunk = payload.slice(i, i + 100);
    const recChunk = recipients.slice(i, i + 100);
    const res = await resend.batch.send(chunk);

    if (res.error) return { skipped: false as const, error: res.error.message, results: [] as RecipientResult[] };

    (res.data?.data ?? []).forEach((item, idx) => {
      results.push({
        email: recChunk[idx].email,
        subscriberId: recChunk[idx].subscriberId,
        resendId: item.id ?? null,
      });
    });
  }

  return { skipped: false as const, error: null, results };
}
