import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

describe("EmailValidatorAdapter", () => {
  const makeSut = (): EmailValidatorAdapter => {
    return new EmailValidatorAdapter();
  };

  const sut = makeSut();

  jest.mock("validator", () => ({
    isEmail(): boolean {
      return true;
    },
  }));

  test("Should call isValid with correct values", () => {
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@email.com");

    expect(isEmailSpy).toHaveBeenCalledWith("any_email@email.com");
  });

  test("Should return true if valid email", () => {
    const isValid = sut.isValid("valid_email@email.com");

    expect(isValid).toBe(true);
  });

  test("Should return false if invalid email", () => {
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email@email.com");

    expect(isValid).toBe(false);
  });
});
