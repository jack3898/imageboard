import { expect, it, describe } from "vitest";
import { PASSWORD, USERNAME } from "./regex.js";

describe("password regex", () => {
  it("should validate a password with all characters", () => {
    const pw =
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_+{}:@~<>?-=[];'#,./\\|";

    expect(pw.match(PASSWORD)?.[0]).toBeTruthy();
  });

  it("should validate a password with multiple characters", () => {
    const pw =
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_+{}:@~<>?-=[];'#,./\\|1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_+{}:@~<>?-=[];'#,./\\|";

    expect(pw.match(PASSWORD)?.[0]).toBeTruthy();
  });

  it("should reject a password with spaces", () => {
    expect("he llo".match(PASSWORD)?.[0]).toBeFalsy();
  });

  it("should reject a password that contains at least 1 invalid character", () => {
    expect("f😂".match(PASSWORD)?.[0]).toBeFalsy();
  });
});

describe("username regex", () => {
  it("should validate an alphanumeric username", () => {
    expect("Jack1".match(USERNAME)?.[0]).toBeTruthy();
  });

  it("should reject a username with illegal special characters", () => {
    expect("Jack1!".match(USERNAME)?.[0]).toBeFalsy();
  });

  it("should accept a username with underscores or dashes", () => {
    expect("_Jac_-k-1_-".match(USERNAME)?.[0]).toBeTruthy();
  });
});
