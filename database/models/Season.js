const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Season = sequelize.define("Season", {
    seasonNumber: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } }
  });

  return Season;
};
