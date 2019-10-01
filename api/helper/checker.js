const checkFilter = labelsId => labelsId.some(labelId => labelId.length != 0)

const checkSearch = search => {
  let searchCheck = false
  if (search.length != 0) searchCheck = true
  return searchCheck
}

module.exports = {
  checkFilter,
  checkSearch
}