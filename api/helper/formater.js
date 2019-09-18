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

const formatAccountsId = accounts => {
  let accountsId = []
  accounts.forEach(account => {
    accountsId.push(account.id)
  })
  return accountsId
}

const formatCategoriesLabelsId = categoryLabels => {
  let categoryLabelsId = {
    typeOfProfile : [],
    topicByBusiness: [],
    interest: [],
    demographicOrTarget: []
  } 
  categoryLabels.typeOfProfile.forEach(label => {
    categoryLabelsId.typeOfProfile.push(label.id)
  })
  categoryLabels.topicByBusiness.forEach(label => {
    categoryLabelsId.topicByBusiness.push(label.id)
  })
  categoryLabels.interest.forEach(label => {
    categoryLabelsId.interest.push(label.id)
  })
  categoryLabels.demographicOrTarget.forEach(label => {
    categoryLabelsId.demographicOrTarget.push(label.id)
  })
  return categoryLabelsId
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
    assignmentObj.startPoint = progress[index]
    assignmentObj.total = assignment.total
    assignmentObj.status = assignment.status
    assignmentFormat.push(assignmentObj);
  })
  return assignmentFormat
}

const formatCategoryLabels = (category, labels) => {
  let categoryLabels = {}
  categoryLabels.id = category.id
  categoryLabels.name = category.name
  categoryLabels.labels = labels
  return categoryLabels
}

module.exports = {
  formatLabellingReservation,
  formatAssignmentProgress,
  formatAccountLabellings,
  formatCategoryLabels,
  formatCategoriesLabelsId,
  formatAccountsId
}