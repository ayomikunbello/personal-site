import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseDevice, parseBrowser, getReferrerDomain, hashVisitor, shouldTrackPath } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const path: string = body?.path ?? "/";
  const referrer: string | null = body?.referrer || null;

  if (!shouldTrackPath(path)) return NextResponse.json({ ok: true });

  const userAgent = req.headers.get("user-agent") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Vercel populates these geo headers automatically in production; absent locally.
  const country = req.headers.get("x-vercel-ip-country") || null;
  const city = req.headers.get("x-vercel-ip-city") || null;

  const supabase = await createClient();
  await supabase.from("page_views").insert({
    path,
    referrer_domain: getReferrerDomain(referrer),
    country,
    city: city ? decodeURIComponent(city) : null,
    device: parseDevice(userAgent),
    browser: parseBrowser(userAgent),
    visitor_hash: hashVisitor(ip, userAgent),
  });

  return NextResponse.json({ ok: true });
}
