"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  createHighlight,
  updateHighlight,
  deleteHighlight,
} from "@/app/admin/(dashboard)/highlights/actions";
import type { Highlight } from "@/lib/queries";

function Fields({ item }: { item?: Highlight }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="date_label"
          defaultValue={item?.date_label}
          required
          placeholder="e.g. 22 November, 2023"
          className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
        <input
          name="sort_order"
          type="number"
          defaultValue={item?.sort_order ?? 0}
          className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
      </div>
      <textarea
        name="text"
        defaultValue={item?.text}
        required
        rows={3}
        placeholder="Update text…"
        className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="href"
          defaultValue={item?.href ?? ""}
          placeholder="Link (optional)"
          className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
        <input
          name="image_url"
          defaultValue={item?.image_url ?? ""}
          placeholder="/images/your-photo.jpg"
          className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
      </div>
    </>
  );
}

function EditRow({ item, onDone }: { item: Highlight; onDone: () => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateHighlight(item.id, formData);
      if (res.error) setError(res.error);
      else onDone();
    });
  }

  return (
    <form action={handleSubmit} className="space-y-3 rounded-2xl border border-violet-200 bg-violet-50/50 p-4">
      <Fields item={item} />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-violet-900 disabled:opacity-60">
          {pending ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onDone} className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5">
          Cancel
        </button>
      </div>
    </form>
  );
}

function AddForm({ nextOrder }: { nextOrder: number }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await createHighlight(formData);
      if (res.error) setError(res.error);
      else setOpen(false);
    });
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-dashed border-ink/25 px-4 py-2 text-sm font-semibold text-ink/60 hover:border-violet-400 hover:text-violet-700">
        + Add news item
      </button>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-3 rounded-2xl border border-ink/10 bg-white p-4">
      <input type="hidden" name="sort_order" value={nextOrder} />
      <Fields />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-violet-900 disabled:opacity-60">
          {pending ? "Adding…" : "Add"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function HighlightsManager({ items }: { items: Highlight[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this news item?")) return;
    startTransition(async () => {
      await deleteHighlight(id);
    });
  }

  return (
    <div className="space-y-3">
      {items.map((item) =>
        editingId === item.id ? (
          <EditRow key={item.id} item={item} onDone={() => setEditingId(null)} />
        ) : (
          <div key={item.id} className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-4">
            {item.image_url && (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={item.image_url} alt="" fill sizes="4rem" className="object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-ink/40">{item.date_label}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/80">{item.text}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => setEditingId(item.id)} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5">
                Edit
              </button>
              <button type="button" disabled={pending} onClick={() => handleDelete(item.id)} className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        )
      )}
      <AddForm nextOrder={items.length} />
    </div>
  );
}
