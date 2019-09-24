var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var accountBooking = require("./routes/account-booking")
var account = require("./routes/account")
var login = require("./routes/login")
var user = require("./routes/user")
const assignment = require("./routes/assignment")
var label = require("./routes/label")
var hierarchy = require("./routes/hierachy_label")
var cors = require("cors")
var port = 3000
const { findUserByUsername } = require("./helper/query");

const accountModel = require("./model/account-model");
const labelModel = require("./model/label-model");
const userModel = require("./model/user-model");
const assignmentModel = require("./model/assignment-model");
const roleModel = require("./model/role-model");
const countryModel = require("./model/country-model");
const channelModel = require("./model/channel-model");
const accountBookingModel = require("./model/account-booking-model");
const accountLabellingModel = require("./model/account-labelling-model")

const jwt = require("jwt-simple");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const SECRET = "MY_SECRET_KEY";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRET
};
//  payload.sub ????

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    var user = await findUserByUsername(payload.username);
    if (user) {
      return done(null, user);
    }
  } catch (error) {
    return done(error, false);
  }

});
passport.use(jwtAuth);
const requireJWTAuth = passport.authenticate("jwt", { session: false });
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

app.use('/user', login);
app.use("/api", requireJWTAuth, [label, account, hierarchy, accountBooking, user, assignment]);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
