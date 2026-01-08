jest.mock("../../src/config/agenda.js", () => ({
  agenda: {
    start: jest.fn(),
    define: jest.fn(),
    every: jest.fn(),
    schedule: jest.fn(),
    now: jest.fn(),
  },
}));

jest.mock("firebase-admin", () => ({
  apps: [],
  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },
  messaging: jest.fn(() => ({ send: jest.fn() })),
}));

import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app.js";

let mongoServer: MongoMemoryServer;

describe("Auth Api Integration Tests", () => {
  // 2. Setup: Start an in-memory database before all tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: "test" });
  });

  // 3. Cleanup: Clear all data between tests to avoid "Email already registered" errors
  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const collection in collections) {
      await collections[collection].deleteMany({});
    }
  });

  // 4. Teardown: Disconnect and stop server so Jest can exit cleanly
  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should successfully register a new user", async () => {
      const userData = {
        name: "Mohamed Amr",
        email: "mo@test.com",
        password: "StrongPassword123!",
      };

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(res.status).toBe(201);
      // We check res.body.data because of your sendResponse utility
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.body.data).toHaveProperty("refreshToken");
      expect(res.body.data.user.email).toBe(userData.email);
    });

    it("should fail with 409 if email is already registered", async () => {
      const userData = {
        name: "Test User",
        email: "duplicate@test.com",
        password: "Password123!",
      };

      // Register once
      await request(app).post("/api/v1/auth/register").send(userData);

      // Try registering again
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Email already registered");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should return login successfully", async () => {
      const userData = {
        name: "Mohamed Amr",
        email: "mo@test.com",
        password: "StrongPassword123!",
      };
      await request(app).post("/api/v1/auth/register").send(userData);
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: userData.email, password: userData.password });
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.body.data).toHaveProperty("refreshToken");
    });
    it("should return fail with 401 for incorrect password", async () => {
      const userData = {
        name: "Test",
        email: "test@fail.com",
        password: "CorrectPass",
      };
      await request(app).post("/api/v1/auth/register").send(userData);
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: userData.email, password: "WrongPass" });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });
  });
});
