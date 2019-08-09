const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  "labelings",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    account_id: {
      type: Sequelize.STRING,
      references: {
        model: "accounts",
        key: "id"
      }
    },
    assignment_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "assignments",
        key: "id"
      }
    },
    label_at: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING
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
