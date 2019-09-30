const expect = require('chai').expect;
const accountModel = require("../model/account-model");
const labelModel = require("../model/label-model");
const userModel = require("../model/user-model");
const assignmentModel = require("../model/assignment-model");
const roleModel = require("../model/role-model");
const countryModel = require("../model/country-model");
const channelModel = require("../model/channel-model");
const accountBookingModel = require("../model/account-booking-model");
const accountLabellingModel = require("../model/account-labelling-model")
const { findAccountsLabelling } = require('../helper/query');

accountBookingModel.hasMany(accountLabellingModel, { foreignKey: 'booking_id' })
accountLabellingModel.belongsTo(accountBookingModel, { foreignKey: 'booking_id' })
accountLabellingModel.belongsTo(labelModel, { foreignKey: 'label_id' })
labelModel.hasMany(accountLabellingModel, { foreignKey: 'label_id' })
accountModel.hasMany(accountBookingModel, { foreignKey: 'account_id' });
accountModel.belongsTo(channelModel, { foreignKey: 'channel_id' });
accountModel.belongsTo(countryModel, { foreignKey: 'country_id' });

accountLabellingModel.belongsTo(accountBookingModel, { foreignKey: 'booking_id' })
accountLabellingModel.belongsTo(labelModel, { foreignKey: 'label_id' })

channelModel.hasMany(accountModel, { foreignKey: 'channel_id' });
channelModel.hasMany(assignmentModel, { foreignKey: 'id_channel' });


countryModel.hasMany(accountModel, { foreignKey: 'country_id' });
countryModel.hasMany(userModel, { foreignKey: 'from_country_id' });

roleModel.hasMany(userModel, { foreignKey: 'role_id' });

accountBookingModel.belongsTo(accountModel, { foreignKey: 'account_id' });
accountBookingModel.belongsTo(assignmentModel, { foreignKey: 'assignment_id' });
accountBookingModel.hasMany(accountLabellingModel, { foreignKey: 'booking_id' })

labelModel.hasMany(labelModel, { foreignKey: 'parent_id' });
labelModel.belongsTo(labelModel, { foreignKey: 'parent_id' });
labelModel.hasMany(assignmentModel, { foreignKey: 'category_id' });
labelModel.hasMany(accountLabellingModel, { foreignKey: 'label_id' })

assignmentModel.hasMany(accountBookingModel, { foreignKey: 'assignment_id' });
assignmentModel.belongsTo(channelModel, { foreignKey: 'id_channel' });
assignmentModel.belongsTo(userModel, { as: 'assignTo', foreignKey: 'assign_to' });
assignmentModel.belongsTo(userModel, { as: 'assignBy', foreignKey: 'assign_by' });
assignmentModel.belongsTo(labelModel, { foreignKey: 'category_id' });

userModel.hasMany(assignmentModel, { foreignKey: 'assign_to' });
userModel.hasMany(assignmentModel, { foreignKey: 'assign_by' });
userModel.belongsTo(countryModel, { foreignKey: 'from_country_id' });
userModel.belongsTo(roleModel, { foreignKey: 'role_id' });
// describe('คำอธิบายว่าเราจะ Test เรื่องอะไร', () => {
//   beforeEach(() => {
//     // beforeEach ทุก Test case เราจะเข้า function นี้ก่อนเสมอ
//   });
  
//   before(() => {
//     // before คือ เราจะทำ function นี่ก่อนทำ Test case ครั้งแรกครั้งเดียว
//   });
//   afterEach(() => {
//     // afterEach เมื่อจบ Test case แต่ละ Test case เราจะทำ function นี้
//   });
//   after(() => {
//     // after เมื่อจบทุก Test case ถึงจะทำ function นี้
//   });
//   it('คำอธิบาย Test case', () => {
//     // test case
//   });
// });


describe('Test accounts Model', () => { 
  beforeEach(() => {
    const accounts = findAccountsLabelling();
    console.log(JSON.parse(JSON.stringify(accounts)))
      });
  it('accounts labellings', () => {
    // arrange
    
    // act
    const accounts = findAccountsLabelling();
    // assert
    expect(JSON.parse(JSON.stringify(accounts))).to.be.equal(JSON.parse(JSON.stringify(accounts)));
    // expect("").to.be.equal("");
  });
});

