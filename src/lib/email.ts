import { Resend } from "resend";
import { siteConfig } from "@/lib/data";
import { renderNewsletterEmail } from "@/lib/emailTemplate";

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

type NewsletterInput = {
  subject: string;
  bodyHtml: string;
  previewText?: string;
  scheduledAt?: string; // ISO string; if set, Resend sends it at this time instead of immediately
};

export async function sendTestEmail(to: string, input: NewsletterInput) {
  const resend = getResend();
  if (!resend) return { skipped: true as const, reason: "RESEND_API_KEY not set" };

  const html = renderNewsletterEmail({ bodyHtml: input.bodyHtml, previewText: input.previewText });

  const result = await resend.emails.send({
    from: `${siteConfig.name} <${FROM_EMAIL}>`,
    to,
    subject: `[Test] ${input.subject}`,
    html,
  });

  if (result.error) return { skipped: false as const, error: result.error.message };
  return { skipped: false as const, error: null };
}

export async function sendNewsletterBroadcast(recipients: string[], input: NewsletterInput) {
  const resend = getResend();
  if (!resend) return { skipped: true as const, reason: "RESEND_API_KEY not set" };
  if (recipients.length === 0) return { skipped: true as const, reason: "No subscribers" };

  const html = renderNewsletterEmail({ bodyHtml: input.bodyHtml, previewText: input.previewText });

  // Resend's batch send caps at 100 recipients per call; chunk if needed.
  const chunks: string[][] = [];
  for (let i = 0; i < recipients.length; i += 90) chunks.push(recipients.slice(i, i + 90));

  const ids: string[] = [];
  for (const chunk of chunks) {
    const result = await resend.emails.send({
      from: `${siteConfig.name} <${FROM_EMAIL}>`,
      to: FROM_EMAIL,
      bcc: chunk,
      subject: input.subject,
      html,
      ...(input.scheduledAt ? { scheduledAt: input.scheduledAt } : {}),
    });
    if (result.error) return { skipped: false as const, error: result.error.message };
    if (result.data?.id) ids.push(result.data.id);
  }

  return { skipped: false as const, error: null, ids };
}
