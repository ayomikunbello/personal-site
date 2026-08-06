"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { uploadNewsletterImage } from "@/app/admin/(dashboard)/newsletter/upload-action";

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors disabled:opacity-30 ${
        active ? "bg-violet-100 text-violet-800" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  function setLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadNewsletterImage(formData);
    setUploading(false);
    e.target.value = "";
    if (res.url) {
      editor.chain().focus().setImage({ src: res.url }).run();
    } else if (res.error) {
      alert(res.error);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-ink/10 bg-ink/[0.02] p-2">
      <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <span className="underline">U</span>
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <span className="line-through">S</span>
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-ink/10" />

      <ToolbarButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </ToolbarButton>
      <ToolbarButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        H3
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-ink/10" />

      <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        •≡
      </ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1≡
      </ToolbarButton>
      <ToolbarButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        &ldquo;
      </ToolbarButton>
      <ToolbarButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        ―
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-ink/10" />

      <ToolbarButton label="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        ⇤
      </ToolbarButton>
      <ToolbarButton label="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
        ⇔
      </ToolbarButton>

      <div className="mx-1 h-5 w-px bg-ink/10" />

      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
        🔗
      </ToolbarButton>
      <ToolbarButton label="Insert image" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
        {uploading ? "…" : "🖼"}
      </ToolbarButton>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      <div className="mx-1 h-5 w-px bg-ink/10" />

      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
        ↶
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
        ↷
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  initialContent,
  onChange,
}: {
  initialContent?: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { style: "color:#7c3aed;" } }),
      Image.configure({ HTMLAttributes: { style: "max-width:100%;border-radius:12px;" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write your newsletter…" }),
    ],
    content: initialContent || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "newsletter-editor-content min-h-[320px] px-4 py-4 text-sm leading-relaxed text-ink focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-ink/15">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <style jsx global>{`
        .newsletter-editor-content h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1em 0 0.4em;
        }
        .newsletter-editor-content h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 1em 0 0.4em;
        }
        .newsletter-editor-content p {
          margin: 0.6em 0;
        }
        .newsletter-editor-content ul,
        .newsletter-editor-content ol {
          padding-left: 1.4em;
          margin: 0.6em 0;
        }
        .newsletter-editor-content blockquote {
          border-left: 3px solid #c4b5fd;
          padding-left: 1em;
          color: #6b6579;
          margin: 0.8em 0;
        }
        .newsletter-editor-content img {
          margin: 0.8em 0;
        }
        .newsletter-editor-content hr {
          border: none;
          border-top: 1px solid #e5e0f0;
          margin: 1.4em 0;
        }
        .newsletter-editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #b3adc4;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
