const Sequelize = require("sequelize")
require('sequelize-hierarchy')(Sequelize);
const db = require("../database/db.js")

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
  },
  {
    timestamps: false
  }
)
