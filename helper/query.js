const userModel = require("../model/user-model");
const labelModel = require("../model/label-model");
const assignmentModel = require("../model/assignment-model");
const moment = require("moment");

const createAssignment = assignment => {
  const createResult = assignmentModel.create({
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    category_id: assignment.category,
    assign_by: assignment.admin,
    assign_to: assignment.user,
    total: assignment.total
  })
  return createResult
}

const findUserByRoleId = roleId => userModel.findAll({
  where: { role_id: roleId },
  raw: true
});

const findUserByUsername = inputUsername => userModel.findOne({
  where: { username: inputUsername },
  raw: true
});

const findLabelByName = labelName => labelModel.findOne({
  where: { name: labelName },
  raw: true
})

const getLabelsThatIsCategory = () => labelModel.findAll({
  where: { parent_id: null },
  raw: true
})
module.exports = {
  findUserByRoleId,
  findUserByUsername,
  findLabelByName,
  getLabelsThatIsCategory,
  createAssignment
}