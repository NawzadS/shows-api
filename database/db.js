const path = require("path");
const { Sequelize } = require("sequelize");

require("dotenv").config();

const isTest = process.env.NODE_ENV === "test";
const dbFile = isTest ? "shows.test.sqlite" : (process.env.DB_FILE || "shows.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", dbFile),
  logging: false
});

module.exports = { sequelize };
