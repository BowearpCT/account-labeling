var express = require('express')
var router = express.Router()
const { findAccountBooking } = require("../helper/query")
const moment = require("moment")

router.get("/account-booking", async (req, res) => {
  try {
    const labelings = await labelingModel.findAll();
    res.send(labelings);
  } catch (error) {
    res.send(error);
  }
})

router.get("/account-booking/:assignmentId", async (req, res) => {
  try {
    const accountBooking = await findAccountBooking(req.params.assignmentId);
    res.send(accountBooking);
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
