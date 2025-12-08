const { sequelize, Show, Season, Episode } = require("./setup");

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const show = await Show.create({ title: "Test Show", genre: "Drama", rating: 9 });
    const season = await Season.create({ seasonNumber: 1, showId: show.id });
    await Episode.bulkCreate([
      { title: "Episode 1", duration: 45, seasonId: season.id },
      { title: "Episode 2", duration: 50, seasonId: season.id }
    ]);

    console.log("?? Seeded database!");
    if (process.env.NODE_ENV !== "test") process.exit(0);
  } catch (err) {
    console.error("? Seed error:", err);
    if (process.env.NODE_ENV !== "test") process.exit(1);
  }
}

if (require.main === module) seed();

module.exports = seed;
