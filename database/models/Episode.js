module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");
  return sequelize.define("Episode", {
    title: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false }
  });
};
