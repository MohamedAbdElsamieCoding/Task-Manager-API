import { AppError } from "../../src/utils/appError";

describe("App Error Utils", () => {
  it("should create instance of AppError with correct properties", () => {
    const error = new AppError("Test message", "Fail", 404);
    expect(error.message).toBe("Test message");
    expect(error.statusText).toBe("Fail");
    expect(error.statusCode).toBe(404);
  });
});
