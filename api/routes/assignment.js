const express = require('express');
const router = express.Router();
const {
  formatLabellingReservation,
  formatAssignmentProgress } = require("../helper/formater");
const {
  createAssignment,
  findLabelByName,
  findChannelByName,
  findAssignmentByTimeCreate,
  findAccountsForLabel,
  reserveLabelling,
  findAssignments,
  findAssignmentByUserId,
  findAssignmentProgress
} = require("../helper/query");

router.post("/assignment", async (req, res) => {
  let assignment = {};
  try {
    const label = await findLabelByName(req.body.category);
    const channel = await findChannelByName(req.body.channel);
    assignment.channel_id = channel.id;
    assignment.category = label.id;
    assignment.admin = req.body.adminId;
    assignment.user = req.body.userId;
    assignment.total = req.body.total;
    const createdResult = await createAssignment(assignment);
    const assignmentCreated = await findAssignmentByTimeCreate(createdResult.created_at);
    const accountReservations = await findAccountsForLabel(
      assignmentCreated.id_channel,
      assignmentCreated.category_id,
      assignmentCreated.total
    );
    const labellingReserve = formatLabellingReservation(accountReservations, assignmentCreated);
    const reserve = reserveLabelling(labellingReserve);
    res.send(accountReservations);
  } catch (error) {
    res.send(error);
  }
})

router.get("/assignment", async (req, res) => {
  try {
    const assignments = await findAssignments()
    const progress = await findAssignmentProgress(assignments)
    const assignmentProgress = await formatAssignmentProgress(assignments, progress)
    res.send(assignmentProgress)
  } catch (error) {
    res.send(error)
  }
})



router.get("/assignment/user/:userId", async (req, res) => {
  try {
    const assignments = await findAssignmentByUserId(req.params.userId);
    const progress = await findAssignmentProgress(assignments)
    const assignmentProgress = await formatAssignmentProgress(assignments, progress)
    res.send(assignmentProgress)
  } catch (error) {
    res.send(error)
  }
})


module.exports = router
