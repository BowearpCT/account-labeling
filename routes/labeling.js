var express = require('express')
var router = express.Router()
const Sequelize = require("sequelize")
const accountModel = require("../model/account-model")
const labelModel = require("../model/label-model")
const userModel = require("../model/user-model")
const labelingModel = require("../model/labeling-model")
const moment = require("moment")

// get all labelings
router.get("/labeling",(req, res) => {
    labelingModel.findAll()
    .then(accounts => {
        res.json(accounts)
    })
    .catch(err => {         
        res.send("error :"+ err)
    })
})

// insert label and stamp time 
router.post("/labeling",(req, res) => {
    var labeling = labelingModel.build({
        account_id : req.body.account_id,
        label_id : req.body.label_id,
        label_by_user_id : req.body.label_by_user_id,
        label_at : moment().format("YYYY-MM-DD HH:mm:ss"),
        status : 1
    })
    labeling.save().then(() => {
        res.send("success ")
    })
    .catch(err =>{
        res.send("err :" +err)
    })
})

module.exports = router
