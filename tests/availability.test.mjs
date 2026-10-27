import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const load = createRequire(import.meta.url);
const { parseCalendar } = load("../src/lib/availability/ical.ts");
const { normalizePeriods, overlaps, evaluateStay, validateStay } = load(
  "../src/lib/availability/engine.ts",
);
const { assembleSnapshot } = load("../src/lib/availability/snapshot.ts");
const { fetchCalendarSource, isAllowedFeedUrl } = load("../src/lib/availability/source.ts");
const { calendarWindow, civilDate, addDays } = load("../src/lib/availability/dates.ts");
const window = calendarWindow("2026-11-01");
const now = new Date("2026-11-01T12:00:00Z");
const blocked = { start: "2026-11-10", end: "2026-11-13" };
const calendar = (...events) =>
  ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tests//EN", ...events, "END:VCALENDAR"].join(
    "\r\n",
  );
const event = (start = "20261110", end = "20261113", extra = []) =>
  [
    "BEGIN:VEVENT",
    "UID:test-event",
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    ...extra,
    "END:VEVENT",
  ].join("\r\n");
const good = (periods = [blocked], date = now) => ({
  ok: true,
  periods,
  eventCount: periods.length,
  periodCount: periods.length,
  fetchedAt: date.toISOString(),
});

test("all-day stays preserve exclusive check-out without timezone conversion", () => {
  const result = parseCalendar(calendar(event()), window);
  assert.deepEqual(result.periods, [blocked]);
  assert.equal(result.eventCount, 1);
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(civilDate(new Date("2026-11-13T01:00:00Z")), "2026-11-12");
});
for (const [start, end, conflict] of [
  ["09", "10", false],
  ["09", "12", true],
  ["10", "13", true],
  ["11", "14", true],
  ["13", "16", false],
]) {
  test(`exclusive intervals: ${start}→${end}`, () => {
    assert.equal(overlaps(`2026-11-${start}`, `2026-11-${end}`, [blocked]), conflict);
    const snapshot = assembleSnapshot("rio", [good(), good()], 2, now);
    assert.equal(
      evaluateStay(snapshot, `2026-11-${start}`, `2026-11-${end}`).status,
      conflict ? "unavailable" : "available",
    );
  });
}
test("duplicates and genuine overlaps merge; adjacent stays keep their boundary", () => {
  assert.deepEqual(
    normalizePeriods([blocked, blocked, { start: "2026-11-12", end: "2026-11-15" }]),
    [{ start: "2026-11-10", end: "2026-11-15" }],
  );
  const adjacent = { start: "2026-11-13", end: "2026-11-16" };
  assert.deepEqual(normalizePeriods([adjacent, blocked]), [blocked, adjacent]);
  assert.equal(overlaps("2026-11-09", "2026-11-10", [blocked, adjacent]), false);
  assert.equal(overlaps("2026-11-13", "2026-11-14", [blocked, adjacent]), true);
});
for (const [start, end] of [
  ["2026-10-31", "2026-11-04"],
  ["2026-11-10", "2026-11-10"],
  ["2026-11-13", "2026-11-10"],
  ["2026-02-30", "2026-11-10"],
  ["", "2026-11-10"],
]) {
  test(`invalid stay rejected: ${start || "missing"} / ${end}`, () =>
    assert.ok(validateStay(start, end, window.today)));
}
test("valid empty feed is different from invalid or incomplete data", () => {
  assert.deepEqual(parseCalendar(calendar(), window).periods, []);
  const complete = assembleSnapshot("rio", [good([]), good([])], 2, now);
  assert.equal(evaluateStay(complete, "2026-11-10", "2026-11-13").status, "available");
  for (const text of [
    "",
    "<html>error</html>",
    "BEGIN:VCALENDAR\nEND:VCALENDAR",
    calendar(event("20260230", "20260303")),
    calendar(event("20261115", "20261110")),
    calendar("BEGIN:VEVENT\r\nUID:no-start\r\nEND:VEVENT"),
  ])
    assert.throws(() => parseCalendar(text, window));
});
test("summaries and folded private metadata do not determine blocking or leak into output", () => {
  const parsed = parseCalendar(
    calendar(
      event(undefined, undefined, [
        "SUMMARY:Different provider wording",
        "DESCRIPTION:PRIVATE-MARKER",
        " folded-secret",
      ]),
    ),
    window,
  );
  assert.deepEqual(parsed.periods, [blocked]);
  assert.ok(!JSON.stringify(parsed).includes("PRIVATE-MARKER"));
});
test("cancelled and explicitly transparent events do not block nights", () => {
  assert.equal(
    parseCalendar(calendar(event(undefined, undefined, ["STATUS:CANCELLED"])), window).periods
      .length,
    0,
  );
  assert.equal(
    parseCalendar(calendar(event(undefined, undefined, ["TRANSP:TRANSPARENT"])), window).periods
      .length,
    0,
  );
});
test("recurrence honors EXDATE and cancelled recurrence exceptions", () => {
  const recurring = event("20261110", "20261111", [
    "RRULE:FREQ=DAILY;COUNT=4",
    "EXDATE;VALUE=DATE:20261111",
  ]);
  const exception = [
    "BEGIN:VEVENT",
    "UID:test-event",
    "RECURRENCE-ID;VALUE=DATE:20261112",
    "DTSTART;VALUE=DATE:20261112",
    "DTEND;VALUE=DATE:20261113",
    "STATUS:CANCELLED",
    "END:VEVENT",
  ].join("\r\n");
  assert.deepEqual(parseCalendar(calendar(recurring, exception), window).periods, [
    { start: "2026-11-10", end: "2026-11-11" },
    { start: "2026-11-13", end: "2026-11-14" },
  ]);
});
test("UTC events use the property's timezone; unsupported TZIDs fail closed", () => {
  const timed =
    "BEGIN:VEVENT\r\nUID:utc\r\nDTSTART:20261111T010000Z\r\nDTEND:20261114T010000Z\r\nEND:VEVENT";
  assert.deepEqual(parseCalendar(calendar(timed), window).periods, [blocked]);
  assert.throws(() =>
    parseCalendar(
      calendar(
        "BEGIN:VEVENT\r\nUID:tz\r\nDTSTART;TZID=Unknown/Zone:20261110T140000\r\nDTEND;TZID=Unknown/Zone:20261113T100000\r\nEND:VEVENT",
      ),
      window,
    ),
  );
});
test("partial failures, total failures, missing sources and stale cache never confirm availability", () => {
  for (const sources of [
    [good(), { ok: false, reason: "timeout" }],
    [
      { ok: false, reason: "http" },
      { ok: false, reason: "network" },
    ],
    [good()],
    [good([], new Date(now.getTime() - 301000)), good([])],
  ]) {
    const snapshot = assembleSnapshot("rio", sources, 2, now);
    assert.equal(snapshot.complete, false);
    assert.equal(evaluateStay(snapshot, "2026-11-20", "2026-11-22").status, "unconfirmed");
  }
  assert.equal(assembleSnapshot("mirante", [good([])], 2, now).complete, false);
  assert.equal(
    assembleSnapshot("mirante", [{ ok: false, reason: "invalid" }], 2, now).status,
    "error",
  );
});
test("out-of-window stays are not confirmed", () => {
  const snapshot = assembleSnapshot("rio", [good([]), good([])], 2, now);
  assert.equal(evaluateStay(snapshot, "2030-01-01", "2030-01-05").status, "unconfirmed");
});
test("source fetch validates HTTP and ICS and returns only safe failure codes", async () => {
  const marker = "PRIVATE-TOKEN-MARKER";
  const success = await fetchCalendarSource(marker, window, {
    fetcher: async () => new Response(calendar(event())),
  });
  assert.equal(success.ok, true);
  for (const fetcher of [
    async () => new Response(marker, { status: 500 }),
    async () => new Response("invalid " + marker),
    async () => {
      throw new Error(marker);
    },
  ]) {
    const result = await fetchCalendarSource(marker, window, { fetcher });
    assert.equal(result.ok, false);
    assert.ok(!JSON.stringify(result).includes(marker));
  }
});
test("timeout fails closed", async () => {
  const fetcher = (_url, { signal }) =>
    new Promise((_resolve, reject) =>
      signal.addEventListener("abort", () => reject(new Error("aborted"))),
    );
  assert.deepEqual(
    await fetchCalendarSource("not-a-real-token", window, { fetcher, timeoutMs: 10 }),
    { ok: false, reason: "timeout" },
  );
});
test("only HTTPS provider hosts are allowed; redirects are not followed", async () => {
  for (const url of [
    "http://www.airbnb.com/calendar",
    "https://www.airbnb.com.evil.test/feed",
    "https://www.airbnb.com@127.0.0.1/feed",
    "https://127.0.0.1/feed",
    "https://www.airbnb.com:8080/feed",
  ])
    assert.equal(isAllowedFeedUrl(url, "airbnb"), false);
  assert.equal(isAllowedFeedUrl("https://www.airbnb.com/calendar/ical/test.ics", "airbnb"), true);
  assert.equal(isAllowedFeedUrl("https://ical.booking.com/v1/export/test", "booking"), true);
  let redirect;
  await fetchCalendarSource("test", window, {
    fetcher: async (_url, options) => {
      redirect = options.redirect;
      return new Response(calendar());
    },
  });
  assert.equal(redirect, "error");
});
