import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire, Module } from "node:module";

const load = createRequire(import.meta.url);
const variables = [
  "CABANA_RIO_AIRBNB_ICAL",
  "CABANA_RIO_BOOKING_ICAL",
  "MIRANTE_CAETE_AIRBNB_ICAL",
  "MIRANTE_CAETE_BOOKING_ICAL",
];
const periods = [
  { start: "2026-10-31", end: "2026-11-02" },
  { start: "2026-11-05", end: "2026-11-08" },
  { start: "2026-11-20", end: "2026-11-22" },
  { start: "2026-12-24", end: "2026-12-26" },
  { start: "2026-12-27", end: "2027-01-03" },
];
const calendar = (entries) => [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  ...entries.flatMap(({ start, end }) => [
    "BEGIN:VEVENT",
    "UID:PRIVATE-UID",
    `DTSTART;VALUE=DATE:${start.replaceAll("-", "")}`,
    `DTEND;VALUE=DATE:${end.replaceAll("-", "")}`,
    "SUMMARY:CLOSED - Not available",
    "DESCRIPTION:PRIVATE-GUEST",
    "END:VEVENT",
  ]),
  "END:VCALENDAR",
].join("\r\n");

function harness(t, { failedVariable, extraBooking = [] } = {}) {
  t.mock.timers.enable({ apis: ["Date"], now: Date.parse("2026-10-27T23:00:00Z") });
  const originals = variables.map((variable) => process.env[variable]);
  const urls = new Map();
  const calls = [];
  const cacheArguments = [];
  for (const variable of variables) {
    const platform = variable.includes("BOOKING") ? "booking" : "airbnb";
    const host = platform === "booking" ? "ical.booking.com" : "www.airbnb.com";
    const url = `https://${host}/PRIVATE-TOKEN-${variable}`;
    process.env[variable] = url;
    urls.set(url, variable);
  }
  t.after(() => variables.forEach((variable, i) => {
    if (originals[i] === undefined) delete process.env[variable];
    else process.env[variable] = originals[i];
  }));
  t.mock.method(globalThis, "fetch", async (url) => {
    const variable = urls.get(url);
    assert.ok(variable, "only configured feeds may be requested");
    calls.push(variable);
    if (variable === failedVariable) return new Response("PRIVATE-TOKEN", { status: 503 });
    const entries = variable.endsWith("AIRBNB_ICAL") ? periods.slice(0, 2) : periods.slice(2);
    return new Response(calendar([...entries, ...(variable.endsWith("BOOKING_ICAL") ? extraBooking : [])]));
  });

  // Exercise the real server, fetch, parser, merge and route. Only Next's runtime
  // boundary is replaced; key identity follows its function + keyParts + args contract.
  const originalLoad = Module._load;
  const runtime = t.mock.method(Module, "_load", function (id, ...args) {
    if (id === "server-only") return {};
    if (id === "next/cache") return {
      unstable_cache(fn, keyParts) {
        const cache = new Map();
        return (...values) => {
          cacheArguments.push(values);
          const key = `${fn.toString()}-${keyParts.join(",")}-${JSON.stringify(values)}`;
          if (!cache.has(key)) cache.set(key, fn(...values));
          return cache.get(key);
        };
      },
    };
    return originalLoad.call(this, id, ...args);
  });
  const serverPath = load.resolve("../src/lib/availability/server.ts");
  const routePath = load.resolve("../src/app/api/availability/route.ts");
  delete load.cache[serverPath];
  delete load.cache[routePath];
  let server, route;
  try {
    server = load(serverPath);
    route = load(routePath);
  } finally {
    runtime.mock.restore();
  }
  return { ...server, ...route, calls, cacheArguments };
}

test("both cabins require Airbnb and Booking and keep independent source caches", async (t) => {
  const { requiredFeeds, getAvailability, calls, cacheArguments } = harness(t);
  for (const cabin of ["rio", "mirante"]) {
    assert.deepEqual(requiredFeeds[cabin].map((feed) => feed.platform), ["airbnb", "booking"]);
    for (let repeat = 0; repeat < 2; repeat++) {
      const snapshot = await getAvailability(cabin);
      assert.equal(snapshot.complete, true);
      assert.equal(snapshot.status, "complete");
      assert.deepEqual(snapshot.blockedPeriods, periods);
    }
  }
  assert.deepEqual([...calls].sort(), [...variables].sort());
  assert.equal(new Set(cacheArguments.map((args) => JSON.stringify(args))).size, 4);
  assert.ok(!JSON.stringify(cacheArguments).includes("PRIVATE-TOKEN"));
});

test("Mirante route preserves all-day Booking periods and exclusive checkout without private data", async (t) => {
  const { GET } = harness(t);
  const response = await GET(new Request("https://example.test/api/availability?cabin=mirante"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const text = await response.text();
  const snapshot = JSON.parse(text);
  assert.equal(snapshot.complete, true);
  assert.deepEqual(snapshot.blockedPeriods, periods);
  for (const privateValue of ["PRIVATE-", "booking.com", "airbnb.com", "CLOSED", "eventCount", "periodCount"])
    assert.ok(!text.includes(privateValue));
  for (const [checkIn, checkOut, expected] of [
    ["2026-11-20", "2026-11-22", "unavailable"],
    ["2026-11-22", "2026-11-23", "available"],
    ["2026-12-26", "2026-12-27", "available"],
    ["2027-01-02", "2027-01-03", "unavailable"],
    ["2027-01-03", "2027-01-04", "available"],
  ]) {
    const result = await GET(new Request(`https://example.test/api/availability?cabin=mirante&checkIn=${checkIn}&checkOut=${checkOut}`));
    assert.equal((await result.json()).stay.status, expected);
  }
});

test("overlaps and duplicates across feeds merge without losing separate Booking periods", async (t) => {
  const overlap = { start: "2026-11-01", end: "2026-11-04" };
  const { getAvailability } = harness(t, { extraBooking: [periods[0], periods[2], overlap] });
  const snapshot = await getAvailability("mirante");
  assert.deepEqual(snapshot.blockedPeriods, [
    { start: periods[0].start, end: overlap.end },
    ...periods.slice(1),
  ]);
});

for (const failedVariable of ["MIRANTE_CAETE_AIRBNB_ICAL", "MIRANTE_CAETE_BOOKING_ICAL"]) {
  test(`Mirante never confirms free dates when ${failedVariable} fails`, async (t) => {
    const { GET } = harness(t, { failedVariable });
    const response = await GET(new Request("https://example.test/api/availability?cabin=mirante&checkIn=2026-11-22&checkOut=2026-11-23"));
    const text = await response.text();
    const snapshot = JSON.parse(text);
    assert.equal(snapshot.complete, false);
    assert.equal(snapshot.status, "incomplete");
    assert.equal(snapshot.stay.status, "unconfirmed");
    assert.deepEqual(snapshot.blockedPeriods, failedVariable.includes("AIRBNB") ? periods.slice(2) : periods.slice(0, 2));
    assert.ok(!text.includes("PRIVATE-"));
  });
}

test("missing Booking configuration prevents a complete Mirante snapshot", async (t) => {
  const { getAvailability, calls } = harness(t);
  delete process.env.MIRANTE_CAETE_BOOKING_ICAL;
  const snapshot = await getAvailability("mirante");
  assert.equal(snapshot.complete, false);
  assert.equal(snapshot.status, "incomplete");
  assert.deepEqual(calls, ["MIRANTE_CAETE_AIRBNB_ICAL"]);
});
