const Sequelize = require("sequelize")
require('sequelize-hierarchy')(Sequelize);
const sequelize = new Sequelize("miniProject", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    accquire: 30000,
    idle: 10000
  },
  query:true
})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db 