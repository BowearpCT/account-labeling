const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  "account_labellings",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    booking_id: {
      type: Sequelize.STRING,
      references: {
        model: "account_booking",
        key: "id"
      }
    },
    label_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "labels",
        key: "id"
      }
    }
  },
  {
    timestamps: false
  }
)
