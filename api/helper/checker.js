const checkFilter = labelsId => {
  let filter = false
  labelsId.forEach(labelId => {
    console.log(labelId)
    if(labelId.length != 0) filter = true
  });
  console.log(filter)
  return filter
}

module.exports = {
  checkFilter
}