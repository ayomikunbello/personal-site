import { siteConfig } from "@/lib/data";

/**
 * Wraps rich-text HTML (from the newsletter editor) in an email-safe
 * template: inline styles only, a hidden preheader for the inbox preview
 * line, and a simple branded footer.
 */
export function renderNewsletterEmail({
  bodyHtml,
  previewText,
}: {
  bodyHtml: string;
  previewText?: string;
}) {
  const year = new Date().getFullYear();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://personal-site-chi-orpin.vercel.app";
  const logoUrl = `${siteUrl}${siteConfig.logo}`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background-color:#f4f2f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    ${
      previewText
        ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>`
        : ""
    }
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2f9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 8px 32px;text-align:center;">
                <img src="${logoUrl}" alt="${escapeHtml(siteConfig.name)}" width="120" style="display:inline-block;height:auto;max-width:120px;" />
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px 32px;font-size:15px;line-height:1.7;color:#3f3a4a;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #eee;font-size:12px;color:#9992a8;">
                © ${year} ${siteConfig.name}. You're receiving this because you subscribed at
                <a href="https://ayo-bello.com" style="color:#7c3aed;">ayo-bello.com</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
