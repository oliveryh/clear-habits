import { describe, expect, it } from "vitest"

import { secondsToSummary } from "./time"

describe("secondsToSummary", () => {
  it("should return a summary string", () => {
    expect(secondsToSummary(3600)).toBe("1h")
    expect(secondsToSummary(3661)).toBe("1h 1m")
    expect(secondsToSummary(3661, true)).toBe("1h 1m 1s")
    expect(secondsToSummary(61, false)).toBe("1m")
    expect(secondsToSummary(61, true)).toBe("1m 1s")
  })
})
