const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Show = sequelize.define("Show", {
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0, max: 10 } }
  });

  return Show;
};
