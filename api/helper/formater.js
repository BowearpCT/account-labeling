const formatLabellingReservation = (accounts, assignment) => {
  const result = accounts.reduce((acc,cur) => [
    ...acc,  
    { assignment_id : assignment.id, account_id : cur.id }
  ],[])
  return result;
}

const formatAccountsId = accounts => accounts.map(account => account.account_id)

const formatCategoriesLabelsId = categoryLabels => {
  let categoryLabelsId = {}
  categoryLabelsId.typeOfProfile = categoryLabels.typeOfProfile.map(label => label.id)
  categoryLabelsId.topicByBusiness = categoryLabels.topicByBusiness.map(label => label.id)
  categoryLabelsId.interest = categoryLabels.interest.map(label => label.id)
  categoryLabelsId.demographicOrTarget = categoryLabels.demographicOrTarget.map(label => label.id)
  return categoryLabelsId
}

const formatAccountLabellings = (reservedId, labels) => {
  const labellingFormat = labels.reduce((acc, cur)=> [...acc, {
      booking_id : reservedId,
      label_id : cur.id
    }],[])
  return labellingFormat
}

const formatAssignmentProgress = (assignments, progress) => assignments.reduce((acc, cur, index)=> {
    const assignment = {
      id: cur.id,
      category: cur.label.name,
      channel: cur.channel.channel_name,
      assignBy: cur.assignBy.name,
      assignTo: cur.assignTo.name,
      progress: progress[index] + "/" + cur.total,
      startPoint: progress[index],
      total: cur.total,
      status: cur.status,
    }
    return [...acc, assignment]
  },[])


const formatCategoryLabels = (category, labels) => {
  let categoryLabels = {
    id: category.id,
    name: category.name,
    labels: labels
  }
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