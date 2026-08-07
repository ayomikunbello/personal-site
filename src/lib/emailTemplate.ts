import { siteConfig } from "@/lib/data";

const HEADER_PURPLE = "#b19cea";
const BODY_CREAM = "#f2efe9";

/**
 * Wraps rich-text HTML (from the newsletter editor, or a transactional
 * email like the welcome message) in an email-safe template: a purple
 * header band with the logo, a cream body, inline styles only, and a
 * hidden preheader for the inbox preview line.
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
  <body style="margin:0;padding:0;background-color:${BODY_CREAM};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    ${
      previewText
        ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>`
        : ""
    }
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BODY_CREAM};">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
            <tr>
              <td style="background-color:${HEADER_PURPLE};padding:36px 32px;">
                <img src="${logoUrl}" alt="${escapeHtml(siteConfig.name)}" width="150" style="display:inline-block;height:auto;max-width:150px;" />
              </td>
            </tr>
            <tr>
              <td style="background-color:${BODY_CREAM};padding:32px;font-size:15px;line-height:1.7;color:#181121;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${BODY_CREAM};padding:0 32px 32px 32px;font-size:12px;color:#8b8496;">
                <div style="border-top:1px solid #e3ded4;padding-top:20px;">
                  © ${year} ${siteConfig.name}. You're receiving this because you subscribed at
                  <a href="https://ayo-bello.com" style="color:#7c3aed;">ayo-bello.com</a>.
                </div>
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
