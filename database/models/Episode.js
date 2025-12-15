const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Episode = sequelize.define("Episode", {
    title: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } }
  });

  return Episode;
};
