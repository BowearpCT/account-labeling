const Sequelize = require("sequelize")
const db = require("../database/db.js")


module.exports = db.sequelize.define(
    "accounts",
    {
        id:{
            type: Sequelize.STRING,
            primaryKey: true,
        },
        page_name:{
            type: Sequelize.STRING
        },
        channel:{
            type: Sequelize.STRING
        },
        country:{
            type: Sequelize.STRING
        }  
    },
    {
        timestamps: false
    }
)

