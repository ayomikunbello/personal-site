import { Resend } from "resend";
import { siteConfig } from "@/lib/data";

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

export async function sendNewsletterBroadcast(
  recipients: string[],
  subject: string,
  body: string
) {
  const resend = getResend();
  if (!resend) return { skipped: true, reason: "RESEND_API_KEY not set" };
  if (recipients.length === 0) return { skipped: true, reason: "No subscribers" };

  // Resend's batch send caps at 100 recipients per call; chunk if needed.
  const chunks: string[][] = [];
  for (let i = 0; i < recipients.length; i += 90) chunks.push(recipients.slice(i, i + 90));

  for (const chunk of chunks) {
    await resend.emails.send({
      from: `${siteConfig.name} <${FROM_EMAIL}>`,
      to: FROM_EMAIL,
      bcc: chunk,
      subject,
      text: body,
    });
  }

  return { skipped: false };
}
