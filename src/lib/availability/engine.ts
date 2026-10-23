import { isCivilDate, nightCount } from "./dates";
import type { AvailabilitySnapshot, BlockedPeriod, StayResult } from "./types";

export function normalizePeriods(periods: BlockedPeriod[]): BlockedPeriod[] {
  const sorted = periods
    .map((period) => {
      if (!isCivilDate(period.start) || !isCivilDate(period.end) || period.end <= period.start) {
        throw new Error("Invalid calendar period");
      }
      return { start: period.start, end: period.end };
    })
    .sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end));
  const result: BlockedPeriod[] = [];
  for (const period of sorted) {
    const previous = result[result.length - 1];
    // Strict overlap: keep adjacent check-out/check-in boundaries separate.
    if (previous && period.start < previous.end)
      previous.end = previous.end > period.end ? previous.end : period.end;
    else result.push(period);
  }
  return result;
}
export function overlaps(start: string, end: string, periods: BlockedPeriod[]): boolean {
  return periods.some((period) => start < period.end && end > period.start);
}
export function isNightBlocked(day: string, periods: BlockedPeriod[]): boolean {
  return periods.some((period) => day >= period.start && day < period.end);
}
export function validateStay(start: string, end: string, today: string): string | null {
  if (!isCivilDate(start) || !isCivilDate(end))
    return "Escolha uma data de entrada e uma de saída válidas.";
  if (start < today) return "A entrada precisa ser a partir de hoje.";
  if (end <= start) return "A saída precisa ser posterior à entrada, com pelo menos uma noite.";
  return null;
}
export function evaluateStay(
  snapshot: AvailabilitySnapshot,
  start: string,
  end: string,
): StayResult {
  const invalid = validateStay(start, end, snapshot.today);
  if (invalid) return { status: "invalid", message: invalid, nights: 0 };
  const nights = nightCount(start, end);
  if (!snapshot.complete || start < snapshot.windowStart || end > snapshot.windowEnd) {
    return {
      status: "unconfirmed",
      message: "Não conseguimos confirmar a disponibilidade dessas datas agora.",
      nights,
    };
  }
  if (overlaps(start, end, snapshot.blockedPeriods)) {
    return { status: "unavailable", message: "Esse período não está disponível.", nights };
  }
  return { status: "available", message: "Período disponível", nights };
}
