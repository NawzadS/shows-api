const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../database/setup");
const seed = require("../database/seed");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await sequelize.sync({ force: true });
  await seed();
});

afterAll(async () => {
  await sequelize.close();
});

test("GET /api/shows returns array", async () => {
  const res = await request(app).get("/api/shows");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
