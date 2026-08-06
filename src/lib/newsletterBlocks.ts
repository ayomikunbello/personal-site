export type Align = "left" | "center" | "right";

export type Block =
  | { id: string; type: "headline"; text: string; align: Align; fontSize: number; color: string }
  | { id: string; type: "paragraph"; html: string; align: Align; fontSize: number; color: string }
  | { id: string; type: "image"; src: string; alt: string; align: Align; link?: string; width: number }
  | { id: string; type: "button"; label: string; href: string; color: string; align: Align }
  | { id: string; type: "divider" }
  | { id: string; type: "social" }
  | { id: string; type: "html"; code: string };

export function newBlock(type: Block["type"]): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case "headline":
      return { id, type, text: "New headline", align: "left", fontSize: 24, color: "#181121" };
    case "paragraph":
      return { id, type, html: "<p>Write something…</p>", align: "left", fontSize: 15, color: "#3f3a4a" };
    case "image":
      return { id, type, src: "", alt: "", align: "center", width: 60 };
    case "button":
      return { id, type, label: "Click here", href: "https://", color: "#181121", align: "left" };
    case "divider":
      return { id, type };
    case "social":
      return { id, type };
    case "html":
      return { id, type, code: "<!-- custom HTML -->" };
  }
}

/** Replaces {$firstname} (and a couple of friendly aliases) with the given name, or a fallback. */
export function applyMergeTags(html: string, name?: string | null) {
  const firstName = (name || "").trim().split(/\s+/)[0] || "there";
  return html
    .replace(/\{\$firstname\}/gi, firstName)
    .replace(/\{\$name\}/gi, name?.trim() || "there");
}

function alignStyle(align: Align) {
  return `text-align:${align};`;
}

export function renderBlocksToHtml(blocks: Block[], recipientName?: string | null): string {
  const html = blocks.map(renderBlock).join("\n");
  return recipientName !== undefined ? applyMergeTags(html, recipientName) : html;
}

function renderBlock(block: Block): string {
  switch (block.type) {
    case "headline":
      return `<h2 style="margin:0 0 12px;font-weight:700;${alignStyle(block.align)}font-size:${block.fontSize}px;color:${block.color};">${block.text}</h2>`;
    case "paragraph":
      return `<div style="margin:0 0 12px;${alignStyle(block.align)}font-size:${block.fontSize}px;line-height:1.7;color:${block.color};">${block.html}</div>`;
    case "image": {
      const img = `<img src="${block.src}" alt="${escapeAttr(block.alt)}" width="${block.width}%" style="max-width:${block.width}%;width:${block.width}%;border-radius:12px;display:inline-block;" />`;
      const wrapped = block.link ? `<a href="${block.link}" target="_blank" rel="noopener noreferrer">${img}</a>` : img;
      return `<div style="margin:0 0 12px;width:100%;${alignStyle(block.align)}">${wrapped}</div>`;
    }
    case "button":
      return `<div style="margin:0 0 16px;${alignStyle(block.align)}"><a href="${block.href}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:${block.color};color:#ffffff;padding:12px 24px;border-radius:9999px;text-decoration:none;font-weight:600;font-size:14px;">${block.label}</a></div>`;
    case "divider":
      return `<hr style="border:none;border-top:1px solid #e5e0f0;margin:20px 0;" />`;
    case "social":
      return `<div style="margin:16px 0;text-align:center;">${renderSocialIcons()}</div>`;
    case "html":
      return block.code;
  }
}

function renderSocialIcons() {
  const links = [
    { label: "Email", href: "mailto:contactme@ayo-bello.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayomikun-bello/" },
    { label: "X", href: "https://twitter.com/ayomikunbello1" },
  ];
  return links
    .map(
      (l) =>
        `<a href="${l.href}" style="display:inline-block;margin:0 6px;width:32px;height:32px;line-height:32px;border-radius:9999px;background:#181121;color:#fff;text-decoration:none;font-size:11px;font-weight:600;">${l.label[0]}</a>`
    )
    .join("");
}

function escapeAttr(s: string) {
  return s.replace(/"/g, "&quot;");
}
