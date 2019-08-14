const express = require('express');
const router = express.Router();
const { createAssignment, findLabelByName } = require("../helper/query");

// build assignmet 
router.post("/assignment", async (req, res) => {
  let assignment = {};
  assignment.admin = req.body.adminId;
  assignment.user = req.body.userId;
  assignment.total = req.body.total;
  try {
    console.log(req.body.category);
    const label = await findLabelByName(req.body.category);
    console.log(label);
    assignment.category = label.id;
    const result = await createAssignment(assignment);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
})

module.exports = router
