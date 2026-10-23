import type { CabinId } from "./redesign-content";

export type StayRequest = { cabinId: CabinId; checkIn: string; checkOut: string; guests?: number };

// Preserve the platform date integration that already existed in the project.
export function platformStayUrl(base: string, platform: "airbnb" | "booking", stay: StayRequest) {
  const url = new URL(base);
  url.searchParams.set(platform === "airbnb" ? "check_in" : "checkin", stay.checkIn);
  url.searchParams.set(platform === "airbnb" ? "check_out" : "checkout", stay.checkOut);
  if (stay.guests !== undefined) {
    url.searchParams.set(platform === "airbnb" ? "adults" : "group_adults", String(stay.guests));
    if (platform === "booking") {
      url.searchParams.set("req_adults", String(stay.guests));
      url.searchParams.set("room1", Array(stay.guests).fill("A").join(","));
    }
  }
  return url.toString();
}
