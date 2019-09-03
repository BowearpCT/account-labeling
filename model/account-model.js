const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  "accounts",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    account_id: {
      type: Sequelize.STRING,
    },
    account_name: {
      type: Sequelize.STRING
    },
    channel_id: {
      type: Sequelize.STRING,
      references: {
        model: "channels",
        key: "id"
      }
    },
    country_id: {
      type: Sequelize.STRING,
      references: {
        model: "countries",
        key: "id"
      }
    }
  },
  {
    timestamps: false
  }
)
