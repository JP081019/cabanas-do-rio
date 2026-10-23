import { parseCalendar } from "./ical";
import type { BlockedPeriod } from "./types";

export type SourceResult =
  | {
      ok: true;
      periods: BlockedPeriod[];
      eventCount: number;
      periodCount: number;
      fetchedAt: string;
    }
  | { ok: false; reason: "configuration" | "http" | "invalid" | "timeout" | "network" };

export function isAllowedFeedUrl(value: string, platform: "airbnb" | "booking"): boolean {
  try {
    const url = new URL(value);
    const host =
      platform === "booking" ? /(^|\.)booking\.com$/i : /(^|\.)airbnb\.(com|com\.br|co\.in)$/i;
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      (!url.port || url.port === "443") &&
      host.test(url.hostname)
    );
  } catch {
    return false;
  }
}
export async function fetchCalendarSource(
  url: string,
  window: { windowStart: string; windowEnd: string },
  options: { fetcher?: typeof fetch; timeoutMs?: number } = {},
): Promise<SourceResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);
  try {
    const response = await (options.fetcher ?? fetch)(url, {
      signal: controller.signal,
      redirect: "error",
      cache: "no-store",
      headers: { Accept: "text/calendar, text/plain;q=0.9" },
    });
    if (!response.ok) return { ok: false, reason: "http" };
    if (Number(response.headers.get("content-length")) > 2000000)
      return { ok: false, reason: "invalid" };
    const reader = response.body?.getReader();
    if (!reader) return { ok: false, reason: "invalid" };
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const item = await reader.read();
      if (item.done) break;
      size += item.value.byteLength;
      if (size > 2000000) {
        await reader.cancel();
        return { ok: false, reason: "invalid" };
      }
      chunks.push(item.value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    try {
      return {
        ok: true,
        ...parseCalendar(new TextDecoder().decode(bytes), window),
        fetchedAt: new Date().toISOString(),
      };
    } catch {
      return { ok: false, reason: "invalid" };
    }
  } catch {
    return { ok: false, reason: controller.signal.aborted ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}
