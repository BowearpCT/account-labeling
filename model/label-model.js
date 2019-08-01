const Sequelize = require("sequelize")
require('sequelize-hierarchy')(Sequelize);
const db = require("../database/db.js")


module.exports = db.sequelize.define(
    "labels",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        parentId: {
            type: Sequelize.INTEGER,
            hierarchy: true
        },
    },
    {
        timestamps: false
    }
)