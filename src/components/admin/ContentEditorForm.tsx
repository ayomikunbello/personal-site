"use client";

import { useState, useTransition } from "react";

export default function ContentEditorForm({
  label,
  hint,
  fieldName,
  defaultValue,
  multiline = false,
  action,
}: {
  label: string;
  hint?: string;
  fieldName: string;
  defaultValue: string;
  multiline?: boolean;
  action: (formData: FormData) => Promise<{ error: string | null }>;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    setSaved(false);
    startTransition(async () => {
      const res = await action(formData);
      if (res.error) setError(res.error);
      else {
        setError(null);
        setSaved(true);
      }
    });
  }

  return (
    <form action={handleSubmit} className="rounded-3xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-semibold text-ink">{label}</h2>
      {hint && <p className="mt-1 text-sm text-ink/50">{hint}</p>}

      {multiline ? (
        <textarea
          name={fieldName}
          defaultValue={defaultValue}
          rows={10}
          className="mt-4 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-violet-400"
        />
      ) : (
        <textarea
          name={fieldName}
          defaultValue={defaultValue}
          rows={3}
          className="mt-4 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm leading-relaxed text-ink outline-none focus:border-violet-400"
        />
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-900 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {saved && <span className="text-sm text-green-700">Saved.</span>}
        {error && <span className="text-sm text-red-700">{error}</span>}
      </div>
    </form>
  );
}
