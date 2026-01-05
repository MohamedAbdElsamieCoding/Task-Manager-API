import { generateToken, verifyToken } from "../../src/utils/jwt";

describe("JWT Utils", () => {
  // Arrange
  const userId = "testUser123";
  it("should generate a valid token", () => {
    // Act
    const token = generateToken(userId);
    // Assert
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);
  });
  it("should to be a valid token", () => {
    // Arrange
    const token = generateToken(userId);
    // Act
    const decoded = verifyToken(token);
    // Assert
    expect(decoded).not.toBeNull();
    expect(decoded?.id).toBe(userId);
  });
  it("should return null for invalid token", () => {
    // Act
    const decoded = verifyToken("invalid.token.here");
    // Assert
    expect(decoded).toBeNull();
  });
});
