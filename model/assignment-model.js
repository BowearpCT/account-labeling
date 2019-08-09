const Sequelize = require("sequelize")
require('sequelize-hierarchy')(Sequelize);
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  "assignments",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "labels",
        key: "id"
      }
    },
    assign_by: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      }
    },
    assign_to: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      }
    },
    updated_at: {
      type: Sequelize.DATE,
    },
    total: {
      type: Sequelize.INTEGER
    }
  }
)

