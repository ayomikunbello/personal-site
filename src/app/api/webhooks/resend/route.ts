import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { createServiceRoleClient } from "@/lib/supabase/serviceRole";

// Resend webhook events: https://resend.com/docs/dashboard/webhooks/event-types
// email.delivered, email.opened, email.clicked, email.bounced, email.complained

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const payload = await req.text();

  if (secret) {
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: "Missing signature headers" }, { status: 400 });
    }

    try {
      new Webhook(secret).verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const event = JSON.parse(payload);
  const emailId: string | undefined = event?.data?.email_id;
  const type: string | undefined = event?.type;

  if (!emailId || !type) return NextResponse.json({ ok: true });

  const supabase = createServiceRoleClient();
  if (!supabase) return NextResponse.json({ ok: true }); // no service role key configured yet

  const columnByEvent: Record<string, string> = {
    "email.delivered": "delivered_at",
    "email.opened": "opened_at",
    "email.clicked": "clicked_at",
    "email.bounced": "bounced_at",
  };

  const column = columnByEvent[type];
  if (!column) return NextResponse.json({ ok: true });

  await supabase
    .from("newsletter_recipients")
    .update({ [column]: event.created_at ?? new Date().toISOString() })
    .eq("resend_email_id", emailId)
    .is(column, null); // don't overwrite an earlier timestamp for the same event

  return NextResponse.json({ ok: true });
}
