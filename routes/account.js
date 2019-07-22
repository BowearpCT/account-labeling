var express = require('express')
var router = express.Router()
const accountModel = require("../model/account-model")
const labelModel = require("../model/label-model")
const userModel = require("../model/user-model")
const labelingModel = require("../model/labeling-model")

// account is unlabel
router.get("/account",(req, res) => {
    accountModel.findAll({
        where:{
            "$labelings.account_id$" :null 
        },
        include:[{
            model : labelingModel
        }]
    })
    .then(accounts => {
        res.json(accounts)
    })
    .catch(err => {         
        res.send("error :"+ err)
    })
})

module.exports = router
