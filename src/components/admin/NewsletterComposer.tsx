"use client";

import { useState, useTransition } from "react";
import BlockEditor from "@/components/admin/BlockEditor";
import { renderNewsletterEmail } from "@/lib/emailTemplate";
import { renderBlocksToHtml, newBlock, type Block } from "@/lib/newsletterBlocks";
import { saveDraft, sendTest, sendOrSchedule } from "@/app/admin/(dashboard)/newsletter/actions";

type Group = { id: string; name: string };
type Draft = {
  subject?: string;
  preview_text?: string | null;
  body_blocks?: Block[] | null;
  group_id?: string | null;
};

export default function NewsletterComposer({
  subscriberCount,
  groups,
  initialDraft,
}: {
  subscriberCount: number;
  groups: Group[];
  initialDraft?: Draft;
}) {
  const [subject, setSubject] = useState(initialDraft?.subject ?? "");
  const [previewText, setPreviewText] = useState(initialDraft?.preview_text ?? "");
  const [blocks, setBlocks] = useState<Block[]>(
    initialDraft?.body_blocks && initialDraft.body_blocks.length > 0
      ? initialDraft.body_blocks
      : [newBlock("headline"), newBlock("paragraph")]
  );
  const [groupId, setGroupId] = useState(initialDraft?.group_id ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  function buildFormData() {
    const fd = new FormData();
    fd.set("subject", subject);
    fd.set("previewText", previewText);
    fd.set("blocks", JSON.stringify(blocks));
    fd.set("groupId", groupId);
    return fd;
  }

  function handleSaveDraft() {
    setMessage(null);
    startTransition(async () => {
      const res = await saveDraft(buildFormData());
      setMessage(res.error ? { type: "error", text: res.error } : { type: "success", text: "Draft saved." });
    });
  }

  function handleSendTest() {
    setMessage(null);
    startTransition(async () => {
      const res = await sendTest(buildFormData());
      if (res.error) setMessage({ type: "error", text: res.error });
      else setMessage({ type: "success", text: `Test sent to ${res.sentTo}.` });
    });
  }

  function handleSend() {
    if (scheduleMode && !scheduledAt) {
      setMessage({ type: "error", text: "Pick a date and time to schedule for." });
      return;
    }
    const audience = groupId ? groups.find((g) => g.id === groupId)?.name : `all ${subscriberCount} subscribers`;
    const confirmMsg = scheduleMode
      ? `Schedule "${subject}" for ${new Date(scheduledAt).toLocaleString()} to ${audience}?`
      : `Send "${subject}" now to ${audience}?`;
    if (!confirm(confirmMsg)) return;

    setMessage(null);
    startTransition(async () => {
      const fd = buildFormData();
      if (scheduleMode) fd.set("scheduledAt", scheduledAt);
      const res = await sendOrSchedule(fd);
      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({
          type: "success",
          text: res.scheduled
            ? `Scheduled for ${new Date(scheduledAt).toLocaleString()} — ${res.count} recipient(s).`
            : `Sent to ${res.count} subscriber(s).`,
        });
        if (!res.scheduled) {
          setSubject("");
          setPreviewText("");
          setBlocks([newBlock("headline"), newBlock("paragraph")]);
        }
      }
    });
  }

  const previewHtml = renderNewsletterEmail({ bodyHtml: renderBlocksToHtml(blocks, "Friend"), previewText });

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">Compose</h2>
        <button
          type="button"
          onClick={() => setShowPreview((v) => !v)}
          className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold text-ink hover:bg-ink/5"
        >
          {showPreview ? "Back to editor" : "Preview email"}
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink/70" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-violet-400"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/70" htmlFor="audience">
            Send to
          </label>
          <select
            id="audience"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-violet-400"
          >
            <option value="">All subscribers ({subscriberCount})</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-ink/70" htmlFor="previewText">
          Preview text <span className="font-normal text-ink/40">(inbox preview snippet, optional)</span>
        </label>
        <input
          id="previewText"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="A short line shown next to the subject in most inboxes…"
          className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-violet-400"
        />
      </div>

      <p className="mt-3 text-xs text-ink/40">
        Tip: use <code className="rounded bg-ink/5 px-1 py-0.5">{"{$firstname}"}</code> anywhere in the body to
        personalize per subscriber.
      </p>

      <div className="mt-5">
        {showPreview ? (
          <div className="overflow-hidden rounded-2xl border border-ink/10">
            <div className="border-b border-ink/10 bg-ink/[0.03] px-4 py-2 text-xs text-ink/50">
              Subject: <span className="font-medium text-ink">{subject || "(no subject)"}</span>
              {previewText && (
                <>
                  {" "}
                  &middot; Preview: <span className="font-medium text-ink">{previewText}</span>
                </>
              )}
            </div>
            <iframe title="Email preview" srcDoc={previewHtml} className="h-[560px] w-full bg-[#f4f2f9]" />
          </div>
        ) : (
          <BlockEditor blocks={blocks} onChange={setBlocks} />
        )}
      </div>

      {message && (
        <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-700" : "text-green-700"}`}>
          {message.text}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={pending || !subject}
          className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5 disabled:opacity-50"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={handleSendTest}
          disabled={pending || !subject || blocks.length === 0}
          className="rounded-full border border-violet-300 px-5 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50 disabled:opacity-50"
        >
          Send test to me
        </button>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-ink/60">
            <input
              type="checkbox"
              checked={scheduleMode}
              onChange={(e) => setScheduleMode(e.target.checked)}
              className="h-3.5 w-3.5"
            />
            Schedule for later
          </label>
          {scheduleMode && (
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none focus:border-violet-400"
            />
          )}
          <button
            type="button"
            onClick={handleSend}
            disabled={pending || !subject || blocks.length === 0 || subscriberCount === 0}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-900 disabled:opacity-60"
          >
            {pending ? "Working…" : scheduleMode ? "Schedule" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
