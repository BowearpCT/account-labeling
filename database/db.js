const Sequelize = require("sequelize")
const accountModel = require("../model/account-model")
const sequelize = new Sequelize("miniProject", "root", "password" ,{
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        accquire: 30000,
        idle: 10000
    }
})


const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
// accountModel.hasMany(labelingModel)




module.exports = db 