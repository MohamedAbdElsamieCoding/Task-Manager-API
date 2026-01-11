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

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";

let mongoServer: MongoMemoryServer;
let token: string;

describe("Tasks Api integration tests", () => {
  beforeAll(async () => {
    // Connect DB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: "test" });
    // Register User & Login
    const userData = {
      name: "Mohamed",
      email: "test@example.com",
      password: "Password123",
    };
    await request(app).post("/api/v1/auth/register").send(userData);
    const loginRes = await request(app).post("/api/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });
    // Get token from login
    token = loginRes.body.data.accessToken;
  });
  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });
  // Testing create Task
  describe("POST /tasks", () => {
    it("should create new task when authenticated", async () => {
      const res = await request(app)
        .post("/api/v1/task")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test task",
          content: "Details here",
          dueTo: new Date().toISOString(),
        });
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe("Test task");
      expect(res.body.data.content).toBe("Details here");
    });
  });
  describe("GET /tasks", () => {
    it("should return tasks with pagination and filtering", async () => {
      const res = await request(app)
        .get("/api/v1/task?limit=2&page=1")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.tasks.length).toBeLessThanOrEqual(2);
    });
  });
});
