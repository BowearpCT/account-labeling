const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "labels",
    {
        id_label: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        th_label_name: {
            type: Sequelize.STRING
        },
        en_label_name: {
            type: Sequelize.STRING
        }  
    },
    {
        timestamps: false
    }
)
