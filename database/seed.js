const { sequelize, Show, Season, Episode } = require("./setup");

async function seedDb() {
  await sequelize.sync({ force: true });

  const show1 = await Show.create({ title: "Rocket League Ranked Nights", genre: "Esports", rating: 9 });
  const show2 = await Show.create({ title: "Late Night FC Sessions", genre: "Sports", rating: 8 });

  const s1 = await Season.create({ seasonNumber: 1, showId: show1.id });
  const s2 = await Season.create({ seasonNumber: 1, showId: show2.id });

  await Episode.bulkCreate([
    { title: "Episode 1", duration: 45, seasonId: s1.id },
    { title: "Episode 2", duration: 50, seasonId: s1.id },
    { title: "Opening Matchday", duration: 42, seasonId: s2.id }
  ]);

  console.log("🌱 Seeded database!");
  await sequelize.close();
}

seedDb().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exitCode = 1;
});
