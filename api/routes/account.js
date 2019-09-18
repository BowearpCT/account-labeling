var express = require('express')
var router = express.Router()
const {
  checkFilter
} = require("../helper/checker")
const {
  formatAccountLabellings,
  formatCategoriesLabelsId,
  formatAccountsId
} = require("../helper/formater")
const {
  findAccountBooking,
  findAccountLabelling,
  insertLabellings,
  updateReservedAccount,
  findAccountsLabelling,
  findAccountsLabelsByAccountsId,
  filterAccounts
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
    await updateReservedAccount(req.body.accountReservedId);
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

router.get("/accounts/labelling",async (req,res) => {
  try {
    const accounts = await findAccountsLabelling();
    res.send(accounts);
  } catch (error) {
    res.send(error)
  }
})

router.get("/accounts/labelling/filter",async (req, res) => {
  const categoryLabels = JSON.parse(req.query.labels)
  const categoriesLabelsId = await formatCategoriesLabelsId(categoryLabels)
  const labelsId = Object.values(categoriesLabelsId)
  console.log(labelsId)
  let filter
  let accountLabels 
  try {
    filter = await checkFilter(labelsId)
    console.log(filter)
    if(filter){
      accounts = await filterAccounts(categoriesLabelsId)
      accountsId = await formatAccountsId(accounts)
      accountLabels = await findAccountsLabelsByAccountsId(accountsId)
      console.log("debug",accountLabels)
    }
    else{
      accountLabels = await findAccountsLabelling()
    }
    console.log(accountLabels)
    res.send(accountLabels)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
