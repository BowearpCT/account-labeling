const checkFilter = labelsId => {
  let filter = false
  labelsId.forEach(labelId => {
    console.log(labelId)
    if(labelId.length != 0) filter = true
  });
  console.log(filter)
  return filter
}

const checkSearch = search => {
  let searchCheck = false
  if (search.length != 0) searchCheck = true
  return searchCheck
}

module.exports = {
  checkFilter,
  checkSearch
}