var express = require('express');
var router = express.Router();
const { getLabelsThatIsCategory } = require("../helper/query");

// all label
// router.get("/label", (req, res) => {
//   accountModel.findAll({
//     where: {
//       "$labelings.account_id$": null
//     },
//     include: [{
//       model: labelingModel
//     }]
//   })
//     .then(accounts => {
//       res.json(accounts)
//     })
//     .catch(err => {
//       res.send("error :" + err)
//     })
// })

router.get("/label/category", async (req, res) => {
  try {
    const categories = await getLabelsThatIsCategory();
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
})
module.exports = router
