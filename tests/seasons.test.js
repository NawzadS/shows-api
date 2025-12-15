const request = require("supertest");
const app = require("../server");
const { sequelize, Show } = require("../database/setup");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await sequelize.sync({ force: true });
  await Show.create({ title: "Seed Show", genre: "Action", rating: 7 });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Seasons API", () => {
  test("POST /api/seasons creates a season", async () => {
    const show = await Show.findOne();
    const res = await request(app).post("/api/seasons").send({ seasonNumber: 1, showId: show.id });
    expect(res.statusCode).toBe(201);
    expect(res.body.seasonNumber).toBe(1);
  });
});
