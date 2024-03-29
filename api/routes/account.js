var express = require('express')
var router = express.Router()
const {
  checkFilter,
  checkSearch
} = require("../helper/checker")
const {
  formatAccountLabellings,
  formatCategoriesLabelsId,
  formatAccountsId,
  groupLabels
} = require("../helper/formater")
const {
  findAccountBooking,
  findAccountLabelling,
  insertLabellings,
  updateReservedAccount,
  findAccountsLabelling,
  findAccountsLabelsByAccountsId,
  filterAccounts,
  findAccountsLabellingsLike
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
    const response = await groupLabels(JSON.parse(JSON.stringify(accounts)))
    res.send(response);
  } catch (error) {
    res.send(error)
  }
})

router.get("/accounts/labelling/filter",async (req, res) => {
  const categoryLabels = JSON.parse(req.query.labels)
  const categoriesLabelsId = await formatCategoriesLabelsId(categoryLabels)
  const labelsId = Object.values(categoriesLabelsId)
  let filter
  let search
  let accountLabels 
  try {
    search = await checkSearch(req.query.search)
    filter = await checkFilter(labelsId)
    if(filter || search){
      if (filter){
        accounts = await filterAccounts(categoriesLabelsId)
        accountsId = await formatAccountsId(accounts)
        accountLabels = await findAccountsLabelsByAccountsId(accountsId, req.query.search)
      }
      else{
        accountLabels = await findAccountsLabellingsLike(req.query.search)
      }
    }
    else{
      accountLabels = await findAccountsLabelling()
    }
    const response = await groupLabels(JSON.parse(JSON.stringify(accountLabels)))
    res.send(response)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
