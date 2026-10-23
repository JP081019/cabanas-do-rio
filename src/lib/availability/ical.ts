import ICAL from "ical.js";
import { addDays, civilDate, isCivilDate } from "./dates";
import { normalizePeriods } from "./engine";
import type { BlockedPeriod } from "./types";

type Window = { windowStart: string; windowEnd: string };
const MAX_EVENTS = 10000;
const MAX_OCCURRENCES = 20000;

function dateOf(time: ICAL.Time): string {
  if (!time || !Number.isFinite(time.year)) throw new Error("Invalid calendar date");
  // DATE and floating values are civil dates, never convert them through UTC.
  const day =
    time.isDate || time.zone.tzid === "floating"
      ? `${String(time.year).padStart(4, "0")}-${String(time.month).padStart(2, "0")}-${String(time.day).padStart(2, "0")}`
      : civilDate(time.toJSDate());
  if (!isCivilDate(day)) throw new Error("Invalid calendar date");
  return day;
}
function ignored(component: ICAL.Component): boolean {
  return (
    String(component.getFirstPropertyValue("status")).toUpperCase() === "CANCELLED" ||
    String(component.getFirstPropertyValue("transp")).toUpperCase() === "TRANSPARENT"
  );
}
function assertTimezone(component: ICAL.Component, calendar: ICAL.Component) {
  for (const name of ["dtstart", "dtend", "recurrence-id", "rdate", "exdate"]) {
    for (const property of component.getAllProperties(name)) {
      if (["dtstart", "dtend", "recurrence-id"].includes(name)) {
        const raw: unknown = property.toJSON()[3];
        if (typeof raw !== "string" || !isCivilDate(raw.slice(0, 10)))
          throw new Error("Invalid calendar date");
      }
      const timezone = property.getParameter("tzid");
      if (
        typeof timezone === "string" &&
        timezone !== "UTC" &&
        timezone !== "GMT" &&
        !calendar.getTimeZoneByID(timezone)
      ) {
        // Unknown TZID must not silently become a UTC date or a free night.
        throw new Error("Unsupported calendar timezone");
      }
    }
  }
}
export function parseCalendar(
  text: string,
  window: Window,
): { periods: BlockedPeriod[]; eventCount: number; periodCount: number } {
  if (
    text.length > 2000000 ||
    !text.trimStart().startsWith("BEGIN:VCALENDAR") ||
    !text.trimEnd().endsWith("END:VCALENDAR")
  )
    throw new Error("Invalid calendar document");
  const calendar = new ICAL.Component(ICAL.parse(text));
  if (calendar.name !== "vcalendar" || String(calendar.getFirstPropertyValue("version")) !== "2.0")
    throw new Error("Invalid calendar document");
  const components = calendar.getAllSubcomponents("vevent");
  if (components.length > MAX_EVENTS) throw new Error("Calendar too large");
  const masters = new Map<string, ICAL.Event>();
  const exceptions: ICAL.Component[] = [];
  const events: ICAL.Event[] = [];
  for (const component of components) {
    if (component.hasProperty("recurrence-id")) {
      exceptions.push(component);
      continue;
    }
    if (ignored(component)) continue;
    if (!component.hasProperty("dtstart")) throw new Error("Calendar event without start");
    assertTimezone(component, calendar);
    const event = new ICAL.Event(component);
    events.push(event);
    if (event.isRecurring()) {
      if (!event.uid || masters.has(event.uid)) throw new Error("Ambiguous recurring event");
      masters.set(event.uid, event);
    }
  }
  for (const exception of exceptions) {
    const master = masters.get(String(exception.getFirstPropertyValue("uid")));
    if (!master) throw new Error("Orphan calendar exception");
    assertTimezone(exception, calendar);
    master.relateException(exception);
  }
  const periods: BlockedPeriod[] = [];
  let iterations = 0;
  function append(startTime: ICAL.Time, endTime: ICAL.Time) {
    const start = dateOf(startTime);
    let end = dateOf(endTime);
    if (endTime.compare(startTime) < 0 || (startTime.isDate && endTime.compare(startTime) === 0)) {
      throw new Error("Invalid calendar interval");
    }
    if (end <= start) end = addDays(start, 1);
    if (start < window.windowEnd && end > window.windowStart) periods.push({ start, end });
  }
  for (const event of events) {
    if (!event.isRecurring()) {
      append(event.startDate, event.endDate);
      continue;
    }
    const iterator = event.iterator();
    let occurrence: ICAL.Time | null;
    while ((occurrence = iterator.next())) {
      if (++iterations > MAX_OCCURRENCES) throw new Error("Calendar recurrence limit exceeded");
      if (dateOf(occurrence) >= addDays(window.windowEnd, 2)) break;
      const detail = event.getOccurrenceDetails(occurrence);
      if (!ignored(detail.item.component)) append(detail.startDate, detail.endDate);
    }
  }
  return {
    periods: normalizePeriods(periods),
    eventCount: components.length,
    periodCount: periods.length,
  };
}
