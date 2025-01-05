import { describe, expect, it } from "vitest";
import { comparePassword, hashPassword } from "#utils/helpers.js";

const password = "dummypassword";

describe("salt function", () => {
  it("should salt string correctly", () => {
    expect(hashPassword(password)).toBeTruthy();
  });
});

describe("compare password", () => {
  it("should return correct password", () => {
    expect(comparePassword(password, hashPassword(password))).toBeTruthy();
  });
});
