import { add } from "#utils/simple.ts";

describe("add function", () => {
  it("adds two positive numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });
});
