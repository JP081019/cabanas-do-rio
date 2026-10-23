import { calendarWindow, civilDate } from "./dates";
import { normalizePeriods } from "./engine";
import type { SourceResult } from "./source";
import { CACHE_SECONDS, type AvailabilitySnapshot, type CabinId } from "./types";

export function assembleSnapshot(
  cabin: CabinId,
  results: SourceResult[],
  requiredCount: number,
  now = new Date(),
): AvailabilitySnapshot {
  const window = calendarWindow(civilDate(now));
  const fresh = results.filter(
    (source): source is Extract<SourceResult, { ok: true }> =>
      source.ok &&
      now.getTime() - Date.parse(source.fetchedAt) <= CACHE_SECONDS * 1000 &&
      Date.parse(source.fetchedAt) <= now.getTime() + 1000,
  );
  const complete = fresh.length === requiredCount && results.length === requiredCount;
  return {
    cabin,
    ...window,
    complete,
    status: complete ? "complete" : fresh.length ? "incomplete" : "error",
    blockedPeriods: normalizePeriods(fresh.flatMap((source) => source.periods)),
    lastUpdated: fresh.length
      ? new Date(Math.min(...fresh.map((source) => Date.parse(source.fetchedAt)))).toISOString()
      : null,
  };
}
