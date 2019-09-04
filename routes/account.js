var express = require('express')
var router = express.Router()
const accountModel = require("../model/account-model")
const {
  insertLabelling,
  findAccountBooking,
  findAccountLabelling,
  formatAccountLabellings,
  insertLabellings
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

router.get("/account/booking/:assignmentId", async (req, res) => {
  try {
    const accounts = await findAccountBooking(req.params.assignmentId);
    res.send(accounts)
  } catch (error) {
    res.send(error)
  }
})

router.post("/account/labelling", async (req, res) => {
  try {
    const accountlabellings = await formatAccountLabellings(req.body.reservedId, req.body.labels)
    const labellingResult = await insertLabellings(accountlabellings);
    res.send(labellingResult)
  } catch (error) {
    res.send(error)
  }
})

router.get("/account/labelling/:accountReservedId",async (req, res) => {
  try {
    const labels = await findAccountLabelling(req.params.accountReservedId);
    res.send(labels)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
