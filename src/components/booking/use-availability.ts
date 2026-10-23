"use client";
import { useEffect, useState } from "react";
import type { AvailabilityResponse, CabinId } from "../../lib/availability/types";

export function useAvailability(cabin: CabinId, enabled: boolean) {
  const [attempt, setAttempt] = useState(0);
  const [received, setReceived] = useState<{
    key: string;
    data: AvailabilityResponse | null;
  } | null>(null);
  const key = `${cabin}:${attempt}`;
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    fetch(`/api/availability?${new URLSearchParams({ cabin })}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Availability unavailable");
        const data: AvailabilityResponse = await response.json();
        if (data.cabin !== cabin || !Array.isArray(data.blockedPeriods))
          throw new Error("Availability unavailable");
        if (active && !controller.signal.aborted) setReceived({ key, data });
      })
      .catch(() => {
        if (active) setReceived({ key, data: null });
      })
      .finally(() => clearTimeout(timer));
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [cabin, enabled, key]);
  return {
    loading: !enabled || received?.key !== key,
    data: received?.key === key ? received.data : null,
    retry: () => setAttempt((value) => value + 1),
    update: (data: AvailabilityResponse) => setReceived({ key, data }),
  };
}
