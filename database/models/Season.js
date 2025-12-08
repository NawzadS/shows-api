module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define("Season", {
    seasonNumber: { type: DataTypes.INTEGER, allowNull: false }
  });
};
