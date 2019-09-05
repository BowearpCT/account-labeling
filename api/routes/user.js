var express = require('express');
var router = express.Router();
const userModel = require("../model/user-model");
const { findUserByRoleId } = require("../helper/query")


router.get("/user", async (req, res) => {
  const userRole = 2;
  try {
    const users = await findUserByRoleId(userRole);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
})

// insert label and stamp time 
// router.post("/labeling",(req, res) => {
//     var labeling = labelingModel.build({
//         account_id : req.body.account_id,
//         label_id : req.body.label_id,
//         label_by_user_id : req.body.label_by_user_id,
//         label_at : moment().format("YYYY-MM-DD HH:mm:ss"),
//         status : 1
//     })
//     labeling.save().then(() => {
//         res.send("success ")
//     })
//     .catch(err =>{
//         res.send("err :" +err)
//     })
// })

module.exports = router
