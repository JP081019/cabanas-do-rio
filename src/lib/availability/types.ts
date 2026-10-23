import type { CabinId } from "../../components/data/redesign-content";

export type { CabinId };
export type BlockedPeriod = { start: string; end: string };
export type AvailabilitySnapshot = {
  cabin: CabinId;
  status: "complete" | "incomplete" | "error";
  complete: boolean;
  blockedPeriods: BlockedPeriod[];
  lastUpdated: string | null;
  today: string;
  windowStart: string;
  windowEnd: string;
};
export type StayResult = {
  status: "available" | "unavailable" | "unconfirmed" | "invalid";
  message: string;
  nights: number;
};
export type AvailabilityResponse = AvailabilitySnapshot & { stay?: StayResult };
export const CACHE_SECONDS = 300;
export const PROPERTY_TIMEZONE = "America/Sao_Paulo";
export function isCabinId(value: unknown): value is CabinId {
  return value === "rio" || value === "mirante";
}
