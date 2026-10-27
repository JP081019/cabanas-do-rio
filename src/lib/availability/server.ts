import "server-only";
import { unstable_cache } from "next/cache";
import { calendarWindow } from "./dates";
import { assembleSnapshot } from "./snapshot";
import { fetchCalendarSource, isAllowedFeedUrl, type SourceResult } from "./source";
import { CACHE_SECONDS, type AvailabilitySnapshot, type CabinId } from "./types";

export const requiredFeeds = {
  rio: [
    { variable: "CABANA_RIO_AIRBNB_ICAL", platform: "airbnb" },
    { variable: "CABANA_RIO_BOOKING_ICAL", platform: "booking" },
  ],
  mirante: [
    { variable: "MIRANTE_CAETE_AIRBNB_ICAL", platform: "airbnb" },
    { variable: "MIRANTE_CAETE_BOOKING_ICAL", platform: "booking" },
  ],
} as const;

// Existing project has Cache Components disabled. Data Cache avoids a framework migration.
const cachedSource = unstable_cache(
  async (
    variable: string,
    platform: "airbnb" | "booking",
    windowStart: string,
    windowEnd: string,
  ): Promise<SourceResult> => {
    const url = process.env[variable]?.trim();
    if (!url || !isAllowedFeedUrl(url, platform)) return { ok: false, reason: "configuration" };
    return fetchCalendarSource(url, { windowStart, windowEnd });
  },
  ["cabanas-ical-v1"],
  { revalidate: CACHE_SECONDS },
);

export async function getAvailability(cabin: CabinId): Promise<AvailabilitySnapshot> {
  const window = calendarWindow();
  const results = await Promise.all(
    requiredFeeds[cabin].map((feed) =>
      cachedSource(feed.variable, feed.platform, window.windowStart, window.windowEnd),
    ),
  );
  // Expired entries returned during background revalidation cannot confirm free nights.
  return assembleSnapshot(cabin, results, requiredFeeds[cabin].length);
}
