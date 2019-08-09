const Sequelize = require("sequelize")
require('sequelize-hierarchy')(Sequelize);
const db = require("../database/db.js")
const roleModel = require("./role-model")

module.exports = db.sequelize.define(
  "channels",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    channel_name: {
      type: Sequelize.STRING,
    },
  }
)
