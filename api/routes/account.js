var express = require('express')
var router = express.Router()
const {formatAccountLabellings} = require("../helper/formater")
const {
  findAccountBooking,
  findAccountLabelling,
  insertLabellings
} = require("../helper/query");

router.get("/account/booking/:assignmentId", async (req, res) => {
  try {
    const accounts = await findAccountBooking(req.params.assignmentId);
    res.send(accounts)
  } catch (error) {
    res.send(error)
  }
})

router.post("/account/labelling/", async (req, res) => {
  try {
    const accountlabellings = await formatAccountLabellings(req.body.accountReservedId, req.body.labels);
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
