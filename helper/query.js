const userModel = require("../model/user-model");
const labelModel = require("../model/label-model");
const assignmentModel = require("../model/assignment-model");
const accountModel = require("../model/account-model");
const channelModel = require("../model/channel-model");
const accountLabellingModel = require("../model/account-labelling-model")
const accountBookingModel = require("../model/account-booking-model")
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

const createAssignment = assignment => {
  const createResult = assignmentModel.create({
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    category_id: assignment.category,
    assign_by: assignment.admin,
    assign_to: assignment.user,
    total: assignment.total,
    id_channel: assignment.channel_id
  })
  return createResult;
}

const insertLabelling = (bookingId, labelId) => accountLabellingModel.create({
  booking_id: bookingId,
  label_id: labelId
})

const getAccountBooking = assignmentId => accountBookingModel.findAll({
  assignment_id: assignmentId
})

const findAssignmentByTimeCreate = datetime => assignmentModel.findOne({
  where: {
    created_at: {
      [Op.gte]: new Date(datetime)
    }
  }
});

const findAssignments = async () => {
  const assignments = await assignmentModel.findAll({
    include: [
      {
        model: labelModel
      },
      { model: channelModel },
      {
        model: userModel,
        as: 'assignBy',
        attributes: ['id', 'name']
      },
      {
        model: userModel,
        as: 'assignTo',
        attributes: ['id', 'name']
      }
    ]
  })
  return assignments
}

const findAssignmentByUserId = async userId => {
  const assignments = await assignmentModel.findAll({
    where: {
      "$assignTo.id$": userId
    },
    include: [
      {
        model: labelModel
      },
      { model: channelModel },
      {
        model: userModel,
        as: 'assignBy',
        attributes: ['id', 'name']
      },
      {
        model: userModel,
        as: 'assignTo',
        attributes: ['id', 'name']
      }
    ],
    raw: true
  })
  return assignments
}

const findAncestorLabels = async parentIdInput => {
  try {
    let result = [];
    let parentId = parentIdInput;
    while (true) {
      var label = await labelModel.findOne({
        where: {
          id: parentId
        },
        raw: true
      });
      result.push(label);
      parentId = label.parent_id || null;
      if (label.parent_id == null) {
        break;
      }
    }
    return result;
  } catch (error) {
    throw error
  }
}

const findDescendentLabels = async labelId => {
  let ancestors = await labelModel.findAll({ where: { id: labelId } });
  let labels = [];
  let labelDescendents = [];
  try {
    while (ancestors.length != 0) {
      for (const ancestor of ancestors) {
        let descendents = await labelModel.findAll({
          where: {
            parent_id: ancestor.id
          }
        });
        labelDescendents.push(...descendents);
      }
      labels.push(...labelDescendents);
      ancestors = labelDescendents;
      labelDescendents = [];
      descendents = undefined;
    }
    return labels
  } catch (error) {
    throw error;
  }
}

const findChannelByName = channelName => channelModel.findOne({
  where: { channel_name: channelName },
  raw: true
});

const reserveLabelling = labellings => accountBookingModel.bulkCreate(labellings)

const findAccountsForLabel = (channelId, categoryId, numberOfAccounts) => {
  const accounts = accountModel.findAll({
    where: {
      channel_id: channelId,
      [Op.or]: {
        "$labelings.id$": null,
        "$labelings.assignment.category_id$": {
          [Op.ne]: categoryId
        }
      }
    },
    limit: numberOfAccounts,
    include: [{
      model: accountBookingModel,
      include: [{
        model: assignmentModel,
      }],
    }],
    subQuery: false
  });
  return accounts;
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
});

const findCategoryLabels = () => labelModel.findAll({
  where: { parent_id: null },
  raw: true
});

const findAccountBooking = assignmentId => accountBookingModel.findAll({
  where: {
    assignment_id: assignmentId
  }
})

const findAssignmentProgress = async assignments => {
  progress = []
  for (let i = 0; i < assignments.length; i++) {
    const { count } = await accountBookingModel.findAndCountAll({
      where: {
        assignment_id: assignments[i].id,
        status: {
          [Op.ne]: null
        }
      },
      raw: true
    })
    progress.push(count);
  }
  return progress
}


module.exports = {
  findUserByRoleId,
  findUserByUsername,
  findLabelByName,
  findChannelByName,
  findAccountsForLabel,
  findAssignmentByTimeCreate,
  findAssignmentByUserId,
  findDescendentLabels,
  findAncestorLabels,
  findAssignments,
  findAccountBooking,
  findAssignmentProgress,
  getAccountBooking,
  findCategoryLabels,
  insertLabelling,
  createAssignment,
  reserveLabelling,
}