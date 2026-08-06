"use client";

import { useState, useTransition } from "react";
import {
  createPublication,
  updatePublication,
  deletePublication,
} from "@/app/admin/(dashboard)/publications/actions";
import type { Publication } from "@/lib/queries";

function EditRow({
  pub,
  onDone,
}: {
  pub: Publication;
  onDone: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updatePublication(pub.id, formData);
      if (res.error) setError(res.error);
      else onDone();
    });
  }

  return (
    <form action={handleSubmit} className="space-y-3 rounded-2xl border border-violet-200 bg-violet-50/50 p-4">
      <textarea
        name="text"
        defaultValue={pub.text}
        required
        rows={3}
        className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
      />
      <div className="flex gap-3">
        <input
          name="href"
          defaultValue={pub.href ?? ""}
          placeholder="https://doi.org/…"
          className="flex-1 rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
        <input
          name="sort_order"
          type="number"
          defaultValue={pub.sort_order}
          className="w-24 rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-violet-900 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function AddForm({ type, nextOrder }: { type: string; nextOrder: number }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await createPublication(formData);
      if (res.error) setError(res.error);
      else setOpen(false);
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-dashed border-ink/25 px-4 py-2 text-sm font-semibold text-ink/60 hover:border-violet-400 hover:text-violet-700"
      >
        + Add {type} entry
      </button>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-3 rounded-2xl border border-ink/10 bg-white p-4">
      <input type="hidden" name="type" value={type} />
      <textarea
        name="text"
        required
        rows={3}
        placeholder="Full citation text…"
        className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
      />
      <div className="flex gap-3">
        <input
          name="href"
          placeholder="https://doi.org/… (optional)"
          className="flex-1 rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
        <input
          name="sort_order"
          type="number"
          defaultValue={nextOrder}
          className="w-24 rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-violet-900 disabled:opacity-60"
        >
          {pending ? "Adding…" : "Add entry"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function PublicationsManager({
  type,
  items,
}: {
  type: "journal" | "conference" | "project";
  items: Publication[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this entry?")) return;
    startTransition(async () => {
      await deletePublication(id);
    });
  }

  return (
    <div className="space-y-3">
      {items.map((pub) =>
        editingId === pub.id ? (
          <EditRow key={pub.id} pub={pub} onDone={() => setEditingId(null)} />
        ) : (
          <div
            key={pub.id}
            className="flex items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-ink/80">{pub.text}</p>
              {pub.href && (
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs font-medium text-violet-700 hover:text-violet-900"
                >
                  {pub.href}
                </a>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setEditingId(pub.id)}
                className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => handleDelete(pub.id)}
                className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}

      <AddForm type={type} nextOrder={items.length} />
    </div>
  );
}
