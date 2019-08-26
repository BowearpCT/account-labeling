var express = require('express')
var router = express.Router()
const accountModel = require("../model/account-model")
const {
  insertLabelling
} = require("../helper/query");


// account is unlabel
router.get("/account", (req, res) => {
  accountModel.findAll({
    where: {
      "$labelings.account_id$": null
    },
    include: [{
      model: labelingModel
    }]
  })
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      res.send("error :" + err)
    })
})

router.post("/account/labelling",async (req, res) => {
  try {
    console.log("api api api");
    
    const labellingResult = await insertLabelling(req.body.bookingId, req.body.labelId);
    res.send(labellingResult)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
