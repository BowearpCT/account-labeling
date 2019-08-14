const express = require('express');
const router = express.Router();
const { createAssignment, findLabelByName, findChannelByName } = require("../helper/query");

// build assignmet 
router.post("/assignment", async (req, res) => {
  let assignment = {};
  assignment.admin = req.body.adminId;
  assignment.user = req.body.userId;
  assignment.total = req.body.total;
  try {
    const label = await findLabelByName(req.body.category);
    const channel = await findChannelByName(req.body.channel);
    assignment.channel_id = channel.id;
    assignment.category = label.id;
    const result = await createAssignment(assignment);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
})

module.exports = router
