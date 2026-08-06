"use client";

import { useRef, useState } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { newBlock, type Block, type Align } from "@/lib/newsletterBlocks";
import { uploadNewsletterImage } from "@/app/admin/(dashboard)/newsletter/upload-action";

const PALETTE: { type: Block["type"]; label: string; icon: string }[] = [
  { type: "headline", label: "Headline", icon: "H" },
  { type: "paragraph", label: "Paragraph", icon: "¶" },
  { type: "image", label: "Image", icon: "🖼" },
  { type: "button", label: "Button", icon: "▭" },
  { type: "divider", label: "Divider", icon: "―" },
  { type: "social", label: "Social", icon: "◎" },
  { type: "html", label: "Custom HTML", icon: "</>" },
];

function AlignPicker({ value, onChange }: { value: Align; onChange: (a: Align) => void }) {
  return (
    <div className="flex gap-1">
      {(["left", "center", "right"] as const).map((a) => (
        <button
          key={a}
          type="button"
          onClick={() => onChange(a)}
          className={`flex h-8 flex-1 items-center justify-center rounded-lg border text-xs font-medium ${
            value === a ? "border-violet-400 bg-violet-50 text-violet-800" : "border-ink/15 text-ink/50 hover:bg-ink/5"
          }`}
        >
          {a}
        </button>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-ink/60">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink/15 px-3 py-2 text-sm text-ink outline-none focus:border-violet-400";

function ImageBlockSettings({
  block,
  onUpdate,
}: {
  block: Extract<Block, { type: "image" }>;
  onUpdate: (b: Block) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadNewsletterImage(fd);
    setUploading(false);
    e.target.value = "";
    if (res.url) onUpdate({ ...block, src: res.url });
    else if (res.error) alert(res.error);
  }

  return (
    <div className="space-y-4">
      <Field label="Image">
        {block.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.src} alt="" className="mb-2 max-h-32 rounded-lg border border-ink/10 object-cover" />
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full rounded-lg border border-dashed border-ink/25 px-3 py-2 text-sm text-ink/60 hover:border-violet-400 hover:text-violet-700"
        >
          {uploading ? "Uploading…" : block.src ? "Replace image" : "Upload image"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </Field>
      <Field label="Alt text">
        <input value={block.alt} onChange={(e) => onUpdate({ ...block, alt: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Link (optional)">
        <input value={block.link ?? ""} onChange={(e) => onUpdate({ ...block, link: e.target.value })} placeholder="https://…" className={inputClass} />
      </Field>
      <Field label="Width (%)">
        <input type="range" min={20} max={100} value={block.width} onChange={(e) => onUpdate({ ...block, width: Number(e.target.value) })} className="w-full" />
      </Field>
      <Field label="Alignment">
        <AlignPicker value={block.align} onChange={(align) => onUpdate({ ...block, align })} />
      </Field>
    </div>
  );
}

function SettingsPanel({ block, onUpdate }: { block: Block; onUpdate: (b: Block) => void }) {
  switch (block.type) {
    case "headline":
      return (
        <div className="space-y-4">
          <Field label="Text">
            <input value={block.text} onChange={(e) => onUpdate({ ...block, text: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Alignment">
            <AlignPicker value={block.align} onChange={(align) => onUpdate({ ...block, align })} />
          </Field>
          <Field label="Font size">
            <input
              type="number"
              value={block.fontSize}
              onChange={(e) => onUpdate({ ...block, fontSize: Number(e.target.value) })}
              className={inputClass}
            />
          </Field>
          <Field label="Color">
            <input type="color" value={block.color} onChange={(e) => onUpdate({ ...block, color: e.target.value })} className="h-9 w-full rounded-lg border border-ink/15" />
          </Field>
        </div>
      );
    case "paragraph":
      return (
        <div className="space-y-4">
          <Field label="Alignment">
            <AlignPicker value={block.align} onChange={(align) => onUpdate({ ...block, align })} />
          </Field>
          <Field label="Font size">
            <input
              type="number"
              value={block.fontSize}
              onChange={(e) => onUpdate({ ...block, fontSize: Number(e.target.value) })}
              className={inputClass}
            />
          </Field>
          <Field label="Color">
            <input type="color" value={block.color} onChange={(e) => onUpdate({ ...block, color: e.target.value })} className="h-9 w-full rounded-lg border border-ink/15" />
          </Field>
          <p className="text-xs text-ink/40">Edit the text itself directly in the block below.</p>
        </div>
      );
    case "image":
      return <ImageBlockSettings block={block} onUpdate={onUpdate} />;
    case "button":
      return (
        <div className="space-y-4">
          <Field label="Label">
            <input value={block.label} onChange={(e) => onUpdate({ ...block, label: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Link">
            <input value={block.href} onChange={(e) => onUpdate({ ...block, href: e.target.value })} placeholder="https://…" className={inputClass} />
          </Field>
          <Field label="Color">
            <input type="color" value={block.color} onChange={(e) => onUpdate({ ...block, color: e.target.value })} className="h-9 w-full rounded-lg border border-ink/15" />
          </Field>
          <Field label="Alignment">
            <AlignPicker value={block.align} onChange={(align) => onUpdate({ ...block, align })} />
          </Field>
        </div>
      );
    case "html":
      return (
        <Field label="HTML code">
          <textarea
            value={block.code}
            onChange={(e) => onUpdate({ ...block, code: e.target.value })}
            rows={10}
            className={`${inputClass} font-mono text-xs`}
          />
        </Field>
      );
    case "divider":
    case "social":
      return <p className="text-xs text-ink/40">No settings for this block.</p>;
  }
}

function BlockCanvasItem({
  block,
  selected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onMove,
  isFirst,
  isLast,
}: {
  block: Block;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (b: Block) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMove: (dir: -1 | 1) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-xl border-2 p-4 transition-colors ${
        selected ? "border-violet-400 bg-violet-50/40" : "border-transparent hover:border-ink/10"
      }`}
    >
      <div
        className={`absolute -top-4 right-2 flex items-center gap-1 rounded-lg border border-ink/10 bg-white p-1 shadow-sm transition-opacity ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <button type="button" disabled={isFirst} onClick={(e) => { e.stopPropagation(); onMove(-1); }} aria-label="Move up" className="flex h-6 w-6 items-center justify-center rounded text-xs text-ink/60 hover:bg-ink/5 disabled:opacity-30">
          ↑
        </button>
        <button type="button" disabled={isLast} onClick={(e) => { e.stopPropagation(); onMove(1); }} aria-label="Move down" className="flex h-6 w-6 items-center justify-center rounded text-xs text-ink/60 hover:bg-ink/5 disabled:opacity-30">
          ↓
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); onDuplicate(); }} aria-label="Duplicate" className="flex h-6 w-6 items-center justify-center rounded text-xs text-ink/60 hover:bg-ink/5">
          ⧉
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(); }} aria-label="Delete" className="flex h-6 w-6 items-center justify-center rounded text-xs text-red-600 hover:bg-red-50">
          ✕
        </button>
      </div>

      <span
        className={`pointer-events-none absolute -left-2 -top-2 rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white transition-opacity ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {block.type}
      </span>

      {block.type === "paragraph" ? (
        <div onClick={(e) => e.stopPropagation()} style={{ textAlign: block.align }}>
          <RichTextEditor initialContent={block.html} onChange={(html) => onUpdate({ ...block, html })} />
        </div>
      ) : (
        <BlockPreview block={block} />
      )}
    </div>
  );
}

function BlockPreview({ block }: { block: Block }) {
  switch (block.type) {
    case "headline":
      return (
        <h2 style={{ textAlign: block.align, fontSize: block.fontSize, color: block.color, fontWeight: 700, margin: 0 }}>
          {block.text}
        </h2>
      );
    case "image": {
      const justify = block.align === "left" ? "flex-start" : block.align === "right" ? "flex-end" : "center";
      return (
        <div style={{ display: "flex", justifyContent: justify, width: "100%" }}>
          {block.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.src} alt={block.alt} style={{ width: `${block.width}%`, borderRadius: 12 }} />
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-ink/20 text-sm text-ink/40">
              No image yet — select this block to upload one
            </div>
          )}
        </div>
      );
    }
    case "button":
      return (
        <div style={{ textAlign: block.align }}>
          <span
            style={{
              display: "inline-block",
              background: block.color,
              color: "#fff",
              padding: "10px 22px",
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {block.label}
          </span>
        </div>
      );
    case "divider":
      return <hr className="border-t border-ink/10" />;
    case "social":
      return (
        <div className="flex justify-center gap-2 text-xs text-ink/50">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">E</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">L</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">X</span>
        </div>
      );
    case "html":
      return <pre className="overflow-x-auto rounded-lg bg-ink/5 p-3 text-xs text-ink/60">{block.code}</pre>;
    default:
      return null;
  }
}

export default function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(blocks[0]?.id ?? null);

  function addBlock(type: Block["type"]) {
    const block = newBlock(type);
    onChange([...blocks, block]);
    setSelectedId(block.id);
  }

  function updateBlock(id: string, updated: Block) {
    onChange(blocks.map((b) => (b.id === id ? updated : b)));
  }

  function deleteBlock(id: string) {
    onChange(blocks.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function duplicateBlock(id: string) {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    const copy = { ...blocks[idx], id: crypto.randomUUID() };
    const next = [...blocks];
    next.splice(idx + 1, 0, copy);
    onChange(next);
  }

  function moveBlock(id: string, dir: -1 | 1) {
    const idx = blocks.findIndex((b) => b.id === id);
    const target = idx + dir;
    if (idx === -1 || target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null;

  return (
    <div>
      {/* Palette — horizontal bar so the canvas below gets full width */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-ink/10 bg-white p-2">
        {PALETTE.map((p) => (
          <button
            key={p.type}
            type="button"
            onClick={() => addBlock(p.type)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-ink/60 hover:bg-violet-50 hover:text-violet-700"
          >
            <span className="text-sm">{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_15rem]">
        {/* Canvas */}
        <div className="min-w-0 space-y-2 rounded-2xl border border-ink/10 bg-[#f4f2f9] p-5">
          {blocks.length === 0 && (
            <p className="py-12 text-center text-sm text-ink/40">
              Add a block from above to start building your email.
            </p>
          )}
          {blocks.map((block, i) => (
            <BlockCanvasItem
              key={block.id}
              block={block}
              selected={block.id === selectedId}
              onSelect={() => setSelectedId(block.id)}
              onUpdate={(b) => updateBlock(block.id, b)}
              onDelete={() => deleteBlock(block.id)}
              onDuplicate={() => duplicateBlock(block.id)}
              onMove={(dir) => moveBlock(block.id, dir)}
              isFirst={i === 0}
              isLast={i === blocks.length - 1}
            />
          ))}
        </div>

        {/* Settings */}
        <div className="h-fit rounded-2xl border border-ink/10 bg-white p-4 xl:sticky xl:top-24">
          <h3 className="text-sm font-semibold text-ink">
          {selectedBlock ? `${selectedBlock.type[0].toUpperCase()}${selectedBlock.type.slice(1)} settings` : "Block settings"}
        </h3>
          <div className="mt-4">
            {selectedBlock ? (
              <SettingsPanel block={selectedBlock} onUpdate={(b) => updateBlock(selectedBlock.id, b)} />
            ) : (
              <p className="text-xs text-ink/40">Select a block to edit its settings.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
