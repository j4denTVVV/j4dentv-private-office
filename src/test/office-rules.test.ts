import { describe, expect, it } from "vitest";
import { fromLondonInput, toLondonInput } from "@/lib/office/time";
import { goalProgress, rundownTotal } from "@/lib/office/goals";

describe("Europe/London time", () => {
  it("stores 19:00 London in summer as 18:00 UTC", () => {
    expect(fromLondonInput("2026-07-01T19:00")).toBe("2026-07-01T18:00:00.000Z");
  });
  it("stores 19:00 London in winter as 19:00 UTC", () => {
    expect(fromLondonInput("2026-12-01T19:00")).toBe("2026-12-01T19:00:00.000Z");
  });
  it("round-trips back to London wall time", () => {
    expect(toLondonInput("2026-07-01T18:00:00.000Z")).toBe("2026-07-01T19:00");
  });
});

describe("Road to 1K", () => {
  it("has no progress until a real count is entered", () => {
    expect(goalProgress(null, 1000)).toBeNull();
  });
  it("calculates remaining and percent", () => {
    expect(goalProgress(250, 1000)).toEqual({ current: 250, target: 1000, remaining: 750, pct: 25 });
  });
  it("caps at 100%", () => {
    expect(goalProgress(1200, 1000)?.pct).toBe(100);
  });
});

describe("rundown", () => {
  it("sums segment durations", () => {
    expect(rundownTotal([{ duration_min: 5 }, { duration_min: 40 }, { duration_min: null }])).toBe(45);
  });
});
