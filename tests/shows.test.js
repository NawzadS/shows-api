const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../database/setup");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Shows API", () => {
  test("GET /api/shows returns array", async () => {
    const res = await request(app).get("/api/shows");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/shows creates a show", async () => {
    const res = await request(app).post("/api/shows").send({ title: "Test Show", genre: "Drama", rating: 9 });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Show");
  });

  test("GET /api/shows/:id returns 404 if missing", async () => {
    const res = await request(app).get("/api/shows/9999");
    expect(res.statusCode).toBe(404);
  });
});
