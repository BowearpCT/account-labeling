var express = require('express');
var router = express.Router();
const {formatCategoryLabels} = require("../helper/query")
const {
  findCategoryLabels,
  findAncestorLabels,
  findDescendentLabels,
  findLabelByName,
  findLabels
} = require("../helper/query");

router.get("/labels", async (req, res) => {
  try {
    const categories = await findCategoryLabels();
    const categorylabels = await findLabels(categories);
    res.send(categorylabels)
  } catch (error) {
    res.send(error)
  }
})

router.get("/label/descendents/id/:labelId", async (req, res) => {
  try {
    const labels = await findDescendentLabels(req.params.labelId);
    res.send(labels)
  } catch (error) {
    res.send(error)
  }
})

router.get("/label/descendents/name/:labelName", async (req, res) => {
  try {
    const label = await findLabelByName(req.params.labelName)
    const labels = await findDescendentLabels(label.id);
    res.send(labels)
  } catch (error) {
    res.send(error)
  }
})


router.get("/label/ancestors/:parentId", async (req, res) => {
  try {
    const labels = await findAncestorLabels(req.params.parentId);
    res.send(labels)
  } catch (error) {
    res.send(error)
  }
})

router.get("/label/category", async (req, res) => {
  try {
    const categories = await findCategoryLabels();
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
})
module.exports = router

