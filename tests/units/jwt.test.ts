import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../src/utils/jwt";

describe("JWT Utils", () => {
  // Arrange
  const userId = "testUser123";
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
});
