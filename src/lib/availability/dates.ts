import { PROPERTY_TIMEZONE } from "./types";

export function isCivilDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
export function civilDate(date = new Date(), timezone = PROPERTY_TIMEZONE): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (key: string) => parts.find((part) => part.type === key)!.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}
export function addDays(day: string, amount: number): string {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}
export function addMonths(day: string, amount: number): string {
  const date = new Date(`${day.slice(0, 7)}-01T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + amount);
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(Number(day.slice(8)), last));
  return date.toISOString().slice(0, 10);
}
export function nightCount(start: string, end: string): number {
  return Math.round((Date.parse(`${end}T12:00:00Z`) - Date.parse(`${start}T12:00:00Z`)) / 86400000);
}
export function calendarWindow(today = civilDate()) {
  return {
    today,
    windowStart: `${today.slice(0, 7)}-01`,
    windowEnd: addMonths(`${today.slice(0, 7)}-01`, 19),
  };
}
export function formatStayDate(day: string, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    ...options,
    timeZone: "UTC",
  }).format(new Date(`${day}T12:00:00Z`));
}
