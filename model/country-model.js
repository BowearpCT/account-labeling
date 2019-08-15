const Sequelize = require("sequelize")
require('sequelize-hierarchy')(Sequelize);
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "contries",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    contry_name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false
  }
)
