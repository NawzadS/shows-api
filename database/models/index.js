const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_NAME || "shows.db",
  logging: false
});

// Import models
const Show = require("./Show")(sequelize);
const Season = require("./Season")(sequelize);
const Episode = require("./Episode")(sequelize);

// Relationships
Show.hasMany(Season, { foreignKey: "showId", onDelete: "CASCADE" });
Season.belongsTo(Show, { foreignKey: "showId" });

Season.hasMany(Episode, { foreignKey: "seasonId", onDelete: "CASCADE" });
Episode.belongsTo(Season, { foreignKey: "seasonId" });

module.exports = {
  sequelize,
  Show,
  Season,
  Episode
};
