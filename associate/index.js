const accountModel = require("../model/account-model");
const labelModel = require("../model/label-model");
const userModel = require("../model/user-model");
const assignmentModel = require("../model/assignment-model");
const roleModel = require("../model/role-model");
const countryModel = require("../model/country-model");
const channelModel = require("../model/channel-model");
const labelingModel = require("../model/labeling-model");

accountModel.hasMany(labelingModel, { foreignKey: 'account_id' });
accountModel.belongsTo(channelModel, { foreignKey: 'channel_id' });
accountModel.belongsTo(countryModel, { foreignKey: 'country_id' });

channelModel.hasMany(accountModel, { foreignKey: 'account_id' });

countryModel.hasMany(accountModel, { foreignKey: 'country_id' });
countryModel.hasMany(userModel, { foreignKey: 'from_country_id' });

roleModel.hasMany(userModel, { foreignKey: 'role_id' });

labelingModel.belongsTo(accountModel, { foreignKey: 'account_id' });
labelingModel.belongsTo(assignmentModel, { foreignKey: 'assignment_id' });
labelingModel.belongsTo(labelModel, { foreignKey: 'label_id' });


labelModel.hasMany(labelModel, { foreignKey: 'parent_id' });
labelModel.belongsTo(labelModel, { foreignKey: 'parent_id' });
labelModel.hasMany(assignmentModel, { foreignKey: 'category_id' });

assignmentModel.hasMany(labelingModel, { foreignKey: 'assignment_id' });
assignmentModel.belongsTo(userModel, { foreignKey: 'assign_to' });
assignmentModel.belongsTo(userModel, { foreignKey: 'assign_by' });
assignmentModel.belongsTo(labelModel, { foreignKey: 'category_id' });

userModel.hasMany(assignmentModel, { foreignKey: 'assign_to' });
userModel.hasMany(assignmentModel, { foreignKey: 'assign_by' });
userModel.belongsTo(countryModel, { foreignKey: 'from_country_id' });
userModel.belongsTo(roleModel, { foreignKey: 'role_id' });
