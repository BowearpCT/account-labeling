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

module.exports = {
  formatLabellingReservation
}