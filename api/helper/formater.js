const formatLabellingReservation = (accounts, assignment) => {
  console.log("=== START FORMAT ===")
  const labellingFormat = []
  accounts.forEach((account, index) => {
    let labellingObject = {}
    labellingObject.assignment_id = assignment.id;
    labellingObject.account_id = account.id;
    labellingFormat.push(labellingObject);
    console.log(`format ${index}`);
    console.log(`assignment id : ${labellingObject.assignment_id}`);
    console.log(`accounts id : ${labellingObject.account_id}`);
  });
  console.log("=== DONE ===")
  return labellingFormat;
}

const formatAccountLabellings = (reservedId, labels) => {
  console.log("=== START FORMAT ===")
  let labellingFormat = []
  labels.forEach(label => {
    let labelling = {}
    labelling.booking_id = reservedId
    labelling.label_id = label.id
    labellingFormat.push(labelling)
  })
  return labellingFormat
}

const formatAssignmentProgress = (assignments, progress) => {
  let assignmentFormat = []
  assignments.forEach((assignment, index) => {
    let assignmentObj = {};
    assignmentObj.id = assignment.id
    assignmentObj.category = assignment.label.name
    assignmentObj.channel = assignment.channel.channel_name
    assignmentObj.assignBy = assignment.assignBy.name
    assignmentObj.assignTo = assignment.assignTo.name
    assignmentObj.progress = progress[index] + "/" + assignment.total
    assignmentObj.total = assignment.total
    assignmentObj.status = assignment.status
    assignmentFormat.push(assignmentObj);
  })
  return assignmentFormat
}

module.exports = {
  formatLabellingReservation,
  formatAssignmentProgress,
  formatAccountLabellings
}