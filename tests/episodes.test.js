const request = require("supertest");
const app = require("../server");
const { sequelize, Show, Season } = require("../database/setup");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await sequelize.sync({ force: true });

  const show = await Show.create({ title: "Show X", genre: "Comedy", rating: 6 });
  await Season.create({ seasonNumber: 1, showId: show.id });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Episodes API", () => {
  test("POST /api/episodes creates an episode", async () => {
    const season = await Season.findOne();
    const res = await request(app).post("/api/episodes").send({ title: "Pilot", duration: 44, seasonId: season.id });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Pilot");
  });
});
