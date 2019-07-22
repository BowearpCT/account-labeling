var express = require('express')
var router = express.Router()
const Sequelize = require("sequelize")
const accountModel = require("../model/account-model")
const labelModel = require("../model/label-model")
const userModel = require("../model/user-model")
const labelingModel = require("../model/labeling-model")
const Op = Sequelize.Op
  
// targetModel.belongsTo(sourceTable)  


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/accounts', function (req, res) {
    accountModel.findAll()
    .then(accounts => {
        res.json(accounts)
    })
    .catch(err => {
        
        res.send("error :"+ err)
    })
})
router.get('/labels', function (req, res) {
    labelModel.findAll()
    .then(labels => {
        res.json(labels)
    })
    .catch(err => {
        
        res.send("error :"+ err)
    })
})
router.get('/users', function (req, res) {
    userModel.findAll()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        
        res.send("error :"+ err)
    })
})
router.get('/labeling', function (req, res) {
    labelingModel.findAll()
    .then(labelings => {
        res.json(labelings)
    })
    .catch(err => {
        res.send("error :"+ err)
    })
})


router.get('/unlabel', function (req, res) {   
    accountModel.findAll({
        where: {
            '$labelings.id_labeling$' : 2
        },
        include:[{
            model : labelingModel
        }],
    })
    .then(accounts =>{
        res.json(accounts)
    })
    .catch(err => {
        res.send("error :"+ err)
        console.log(err)
    })
})

router.get('/test',(req,res) => {
    labelingModel.findAll({
        // where: {
        //     id_account : "c"
        // },
        include:[{
            model : accountModel
        }],
    })
    .then(accounts =>{
        res.json(accounts)
    })
    .catch(err => {
        res.send("error :"+ err)
        console.log(err)
    })
})

// test query database 

// define the about route
router.get('/about', function (req, res) {
  res.send('About ME')
})

module.exports = router