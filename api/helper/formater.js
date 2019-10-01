const formatLabellingReservation = (accounts, assignment) => {
  const labellingFormat = []
  accounts.forEach((account, index) => {
    let labellingObject = {}
    labellingObject.assignment_id = assignment.id;
    labellingObject.account_id = account.id;
    labellingFormat.push(labellingObject);
  });
  return labellingFormat;
}

const formatAccountsId = accounts => {
  let accountsId = []
  accounts.forEach(account => {
    accountsId.push(account.account_id)
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

const groupLabels = accountsLabellings => {
  const groupAccountsLabellings = accountsLabellings.reduce((result, account, index, array) => {
    let currentAccount = account
    let results = []
    results.push(...result)
    const duplicate = results.some(checkAccount => {
      return checkAccount.account_id == account.account_id
    })
    let duplicateAccounts
    if (!duplicate){
      duplicateAccounts = array.filter(element => {
        return element.account_id == account.account_id
      })
      currentAccount.account_labellings = duplicateAccounts.reduce((labellings, labelling) => {
        labelling.account_labellings.forEach(label => {
          labellings.push(label)
        });
        return labellings
      },[])
      result.push(currentAccount)
    }
    return result
  },[])
  return groupAccountsLabellings
}

module.exports = {
  formatLabellingReservation,
  formatAssignmentProgress,
  formatAccountLabellings,
  formatCategoryLabels,
  formatCategoriesLabelsId,
  formatAccountsId,
  groupLabels
}