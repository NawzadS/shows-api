const { sequelize } = require("./db");

const ShowModel = require("./models/Show");
const SeasonModel = require("./models/Season");
const EpisodeModel = require("./models/Episode");

const Show = ShowModel(sequelize);
const Season = SeasonModel(sequelize);
const Episode = EpisodeModel(sequelize);

// Relationships
Show.hasMany(Season, { foreignKey: { name: "showId", allowNull: false }, onDelete: "CASCADE" });
Season.belongsTo(Show, { foreignKey: { name: "showId", allowNull: false } });

Season.hasMany(Episode, { foreignKey: { name: "seasonId", allowNull: false }, onDelete: "CASCADE" });
Episode.belongsTo(Season, { foreignKey: { name: "seasonId", allowNull: false } });

module.exports = { sequelize, Show, Season, Episode };
