const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_NAME
});

const Show = require("./models/Show")(sequelize);
const Season = require("./models/Season")(sequelize);
const Episode = require("./models/Episode")(sequelize);

Show.hasMany(Season, { foreignKey: "showId" });
Season.belongsTo(Show, { foreignKey: "showId" });

Season.hasMany(Episode, { foreignKey: "seasonId" });
Episode.belongsTo(Season, { foreignKey: "seasonId" });

async function setup() {
  try {
    await sequelize.sync({ force: true });
    console.log("?? Database tables created!");
    if (process.env.NODE_ENV !== "test") process.exit(0);
  } catch (err) {
    console.error("? Setup error:", err);
    if (process.env.NODE_ENV !== "test") process.exit(1);
  }
}

if (require.main === module) setup();

module.exports = { sequelize, Show, Season, Episode };
