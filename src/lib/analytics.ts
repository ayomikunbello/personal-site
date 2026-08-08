import { createHash } from "crypto";

export function parseDevice(userAgent: string): "mobile" | "tablet" | "desktop" {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet(?!.*mobile)/.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android.*mobile/.test(ua)) return "mobile";
  return "desktop";
}

export function parseBrowser(userAgent: string): string {
  const ua = userAgent;
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/chrome|crios/i.test(ua) && !/edg\//i.test(ua)) return "Chrome";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) return "Safari";
  return "Other";
}

export function getReferrerDomain(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** One-way hash of IP + user agent + day — enough to count unique visitors, not enough to identify anyone. */
export function hashVisitor(ip: string, userAgent: string): string {
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${ip}|${userAgent}|${day}`).digest("hex").slice(0, 32);
}

export const TRACKED_PATH_PREFIXES_EXCLUDE = ["/admin", "/api"];

export function shouldTrackPath(path: string): boolean {
  return !TRACKED_PATH_PREFIXES_EXCLUDE.some((prefix) => path.startsWith(prefix));
}
