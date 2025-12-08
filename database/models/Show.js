module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define("Show", {
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
};
