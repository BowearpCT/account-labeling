var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var labelling = require("./routes/labelling")
var account = require("./routes/account")
var login = require("./routes/login")
var user = require("./routes/user")
const assignment = require("./routes/assignment")
var label = require("./routes/label")
var test = require("./routes/test-routes")
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
const labellingModel = require("./model/labelling-model");

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

accountModel.hasMany(labellingModel, { foreignKey: 'account_id' });
accountModel.belongsTo(channelModel, { foreignKey: 'channel_id' });
accountModel.belongsTo(countryModel, { foreignKey: 'country_id' });

channelModel.hasMany(accountModel, { foreignKey: 'account_id' });
channelModel.hasMany(assignmentModel, { foreignKey: 'channel' });


countryModel.hasMany(accountModel, { foreignKey: 'country_id' });
countryModel.hasMany(userModel, { foreignKey: 'from_country_id' });

roleModel.hasMany(userModel, { foreignKey: 'role_id' });

labellingModel.belongsTo(accountModel, { foreignKey: 'account_id' });
labellingModel.belongsTo(assignmentModel, { foreignKey: 'assignment_id' });
labellingModel.belongsTo(labelModel, { foreignKey: 'label_id' });

labelModel.hasMany(labelModel, { foreignKey: 'parent_id' });
labelModel.belongsTo(labelModel, { foreignKey: 'parent_id' });
labelModel.hasMany(assignmentModel, { foreignKey: 'category_id' });

assignmentModel.hasMany(labellingModel, { foreignKey: 'assignment_id' });
assignmentModel.belongsTo(channelModel, { foreignKey: 'channel' });
assignmentModel.belongsTo(userModel, { foreignKey: 'assign_to' });
assignmentModel.belongsTo(userModel, { foreignKey: 'assign_by' });
assignmentModel.belongsTo(labelModel, { foreignKey: 'category_id' });
assignmentModel.belongsTo(channelModel, { foreignKey: 'channel_id' });

userModel.hasMany(assignmentModel, { foreignKey: 'assign_to' });
userModel.hasMany(assignmentModel, { foreignKey: 'assign_by' });
userModel.belongsTo(countryModel, { foreignKey: 'from_country_id' });
userModel.belongsTo(roleModel, { foreignKey: 'role_id' });


app.use('/test', test);
app.use('/user', login);
app.use("/api", requireJWTAuth, [label, account, hierarchy, labelling, user, assignment]);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))