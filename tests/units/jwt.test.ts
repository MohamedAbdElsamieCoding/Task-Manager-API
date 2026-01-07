import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../src/utils/jwt";

jest.mock("jsonwebtoken");

describe("JWT Utils", () => {
  // Arrange
  const userId = "testUser123";
  const mockedVerify = jwt.verify as jest.Mock;
  it("should generate a valid access token and refresh token", () => {
    // Act
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    // Assert
    expect(typeof accessToken).toBe("string");
    expect(accessToken.split(".").length).toBe(3);

    expect(typeof refreshToken).toBe("string");
    expect(refreshToken.split(".").length).toBe(3);
  });
  it("should be a valid access token", () => {
    const accessToken = generateAccessToken(userId);
    const decoded = verifyToken(accessToken);
    expect(decoded).not.toBeNull();
    expect(decoded?.id).toBe(userId);
  });
  it("should return null if token is invalid", () => {
    mockedVerify.mockImplementation(() => {
      throw new Error("invalid token");
    });
  });
});
