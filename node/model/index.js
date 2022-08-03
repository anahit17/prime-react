const { DB, USER, PASSWORD, PORT, LOCAL } = require("../config/config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  port: PORT,
  host: LOCAL,
  dialect: "mysql",
});

module.exports = { sequelize };
