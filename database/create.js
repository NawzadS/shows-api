const { sequelize } = require("./setup");

async function setupDb() {
  await sequelize.sync({ force: true });
  console.log("📦 Database & tables created!");
  await sequelize.close();
}

setupDb().catch((err) => {
  console.error("❌ Setup failed:", err);
  process.exitCode = 1;
});
