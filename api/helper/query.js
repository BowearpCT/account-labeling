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
const {formatCategoryLabels} = require("./formater")

const createAssignment = assignment => {
  const createResult = assignmentModel.create({
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    category_id: assignment.category,
    assign_by: assignment.admin,
    assign_to: assignment.user,
    total: assignment.total,
    id_channel: assignment.channel_id,
    status: "enable"
  })
  return createResult;
}

const insertLabellings = labellings => accountLabellingModel.bulkCreate(labellings)


const updateReservedAccount = reservedId => accountBookingModel.update(
  {
    status: "enable",
  },
  {
    where: {
      id: reservedId
    }
  });

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
      },
      {
        model: labelModel
      },
    ]
  })
  return assignments
}

const findAssignmentFilter = async filter => {
  let assignments

  if (filter) {
    console.log("in filter", filter.userId, filter.channel, filter.labelId)
    if (filter.userId && filter.channel && filter.labelId) {
      assignments = await findAssignmentsByUserChannelCategory(
        filter.userId,
        filter.channel,
        filter.labelId
      );
    }
    else if (filter.channel && filter.userId) {
      assignments = await findAssignmentsByUserAndChannel(filter.userId, filter.channel)
    }
    else if (filter.labelId && filter.userId) {
      assignments = await findAssignmentsByUserAndCategory(filter.userId, filter.labelId)
    }
    else if (filter.labelId && filter.channel) {
      assignments = await findAssignmentsByCategoryAndChannel(filter.labelId, filter.channel)
    }
    else if (filter.labelId) {
      assignments = await findAssignmentsByLabelId(filter.labelId)
    }
    else if (filter.userId) {
      assignments = await findAssignmentsByUserId(filter.userId)
    }
    else if (filter.channel) {
      assignments = await findAssignmentsByChannel(filter.channel)
    }
    else {
      assignments = await findAssignments()
    }
  }
  console.log(assignments)
  return assignments
}

const findAssignmentsByUserId = userId => assignmentModel.findAll({
  where: {
    assign_to: userId
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
    },
  ]
})

const findAssignmentsByChannel = channel => assignmentModel.findAll({
  where: {
    "$channel.channel_name$": channel
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
  ]
})

const findAssignmentsByLabelId = labelId => assignmentModel.findAll({
  where: {
    "$label.id$": labelId
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
  ]
})

const findAssignmentsByCategoryAndChannel = (labelId, channel) => assignmentModel.findAll({
  where: {
    "$label.id$": labelId,
    "$channel.channel_name$": channel
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
  ]
})

const findAssignmentsByUserAndCategory = (userId, labelId) => assignmentModel.findAll({
  where: {
    assign_to: userId,
    "$label.id$": labelId
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
  ]
})

const findAssignmentsByUserAndChannel = (userId, channel) => assignmentModel.findAll({
  where: {
    assign_to: userId,
    "$channel.channel_name$": channel
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
  ]
})

const findAssignmentsByUserChannelCategory = (userId, channel, labelId) => assignmentModel.findAll({
  where: {
    assign_to: userId,
    "$label.id$": labelId,
    "$channel.channel_name$": channel
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
  ]
})

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
  let ancestors = await labelModel.findAll({ where: { id: labelId },raw:true });
  let labels = [];
  let labelDescendents = [];
  try {
    while (ancestors.length != 0) {
      for (const ancestor of ancestors) {
        let descendents = await labelModel.findAll({
          where: {
            parent_id: ancestor.id
          },
          raw:true
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

const reserveLabelling = accounts => accountBookingModel.bulkCreate(accounts)

const findAccountsForLabel = (channelId, categoryId, numberOfAccounts) => {
  const accounts = accountModel.findAll({
    where: {
      channel_id: channelId,
      [Op.or]: {
        "$account_bookings.id$": null,
        "$account_bookings.assignment.category_id$": {
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

const findAccountLabelling = accountReservedId => accountLabellingModel.find({
  where: {
    "$account_booking.account_id$": accountReservedId
  },
  include: [{ model: accountBookingModel }]
})

const findAccountsLabelling = () => {
  try {
    const accounts = accountBookingModel.findAll({
      where: {
        status:{
          [Op.ne]:null
        }
      },
      include: [
        {
          model: accountLabellingModel,
          include: [
            labelModel,
          ]
        },
        {
          model: accountModel,
          include: [
            channelModel
          ]
        }
      ]
    })
    return accounts
  } catch (error) {
    throw error
  }
}

const findAccountsLabelsByAccountsId = (accountsId, search) => accountBookingModel.findAll({
  where: {
    status:{
      [Op.ne]:null,
    },
    id: accountsId,
    "$account.account_name$" :{
      [Op.like]: `${search}%`
    }
  },
  include: [
    {
      model: accountLabellingModel,
      include: [
        labelModel,
      ]
    },
    {
      model: accountModel,
      include: [
        channelModel
      ]
    }
  ]
})

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

const findLabels = async categories => {
  console.log(categories[0].id)
  let labels = []
  try {
    for(let i=0;i < categories.length;i++){
      const categoryLabels = await findDescendentLabels(categories[i].id)
      const formatResult = await formatCategoryLabels(categories[i], categoryLabels)
      labels.push(formatResult)
    }
    return labels
  } catch (error) {
    console.log(error)
    return error
  }
  
}

const findCategoryLabels = () => labelModel.findAll({
  where: { parent_id: null },
  raw: true
});

const findAccountBooking = assignmentId => accountBookingModel.findAll({
  where: {
    assignment_id: assignmentId
  },
  include: [
    { model: accountModel }
  ]
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
  console.log(progress)
  return progress
}

const deleteAssignment = async assignmentId => {
  try {
    await accountBookingModel.destroy({
      where: {
        assignment_id: assignmentId,
        status: null
      }
    })
    await assignmentModel.update(
      {
        status: "disable",
      },
      {
        where: {
          id: assignmentId
        }
      });
  } catch (error) {
    console.log(error)
    return error
  }
}

const filterAccounts = async categoriesLabelsId => {
  const filterLabelId = [ 
    ...categoriesLabelsId.typeOfProfile, 
    ...categoriesLabelsId.interest, 
    ...categoriesLabelsId.topicByBusiness, 
    ...categoriesLabelsId.demographicOrTarget
  ]
  try {
    const accountsLabels = await accountBookingModel.findAll({
      where: {
        status:{
          [Op.ne]:null
        },
        "$account_labellings.label_id$" : filterLabelId
      },
      include: [
        {
          model: accountLabellingModel,
          include: [
            labelModel,
          ]
        },
        {
          model: accountModel,
          include: [
            channelModel
          ]
        }
      ]
    })
    return accountsLabels
  } catch (error) {
    throw error
  }
}

const findAccountsLabellingsLike = query => accountBookingModel.findAll({
    where:{
      "$account.account_name$" :{
        [Op.like]: `${query}%`
      }
    },
    include: [
      {
        model: accountLabellingModel,
        include: [
          labelModel,
        ]
      },
      {
        model: accountModel,
        include: [
          channelModel
        ]
      }
    ]
  })


module.exports = {
  findUserByRoleId,
  findUserByUsername,
  findLabelByName,
  findChannelByName,
  findAccountsForLabel,
  findAssignmentByTimeCreate,
  findAccountsLabelsByAccountsId,
  findAssignmentFilter,
  findDescendentLabels,
  findAncestorLabels,
  findAssignments,
  findAccountBooking,
  findAccountLabelling,
  findAssignmentProgress,
  getAccountBooking,
  findCategoryLabels,
  insertLabelling,
  insertLabellings,
  createAssignment,
  reserveLabelling,
  deleteAssignment,
  updateReservedAccount,
  findAccountsLabelling,
  findLabels,
  filterAccounts,
  findAccountsLabellingsLike
}