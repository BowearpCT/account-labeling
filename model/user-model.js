const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    role_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "roles",
        key: "id"
      }
    },
    from_country_id: {
      type: Sequelize.INTEGER,
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
