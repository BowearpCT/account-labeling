var express = require('express');
var router = express.Router();
const {
  getLabelsThatIsCategory,
  findAncestorLabels,
  findDescendentLabels
} = require("../helper/query");

router.get("/labels", (req, res) => {
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

router.get("/label/descendents/:labelName", async (req, res) => {
  try {
    const labels = await findDescendentLabels(req.params.labelName);
    res.send(labels)
  } catch (error) {
    res.send(error)
  }
})

router.get("/label/ancestors/:labelName", async (req, res) => {
  try {
    const labels = await findAncestorLabels(req.params.labelName);
    res.send(labels)
  } catch (error) {
    res.send(error)
  }
})

router.get("/label/category", async (req, res) => {
  try {
    const categories = await getLabelsThatIsCategory();
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
})
module.exports = router

