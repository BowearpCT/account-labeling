var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var labeling = require("./routes/labeling")
var account = require("./routes/account")
// var label = require("./routes/label")
var user = require("./routes/user")
var test = require("./routes/test-routes")
var hierarchy = require("./routes/hierachy_label")
// var hierarchyModel = require("./model/label-model")

var cors = require("cors")
var port = 3000

const accountModel = require("./model/account-model")
const labelModel = require("./model/label-model")
const userModel = require("./model/user-model")
const labelingModel = require("./model/labeling-model")
const assignmentModel = require("./model/assignment-model")

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
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  userModel.findOne({
    where:{
      username : payload.username
    }
  })
  .then(user => {
    return done(null, user)
  })
  .catch(err => {
    return done(err, false)
  })
});
passport.use(jwtAuth);
const requireJWTAuth = passport.authenticate("jwt",{session:false});
// app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use("/api", account)
app.use("/h",hierarchy)
// set associate
accountModel.hasMany(labelingModel, {foreignKey: 'account_id'});

labelingModel.belongsTo(accountModel, {foreignKey: 'account_id'});
labelingModel.belongsTo(assignmentModel, {foreignKey: 'assignment_id'});
labelingModel.belongsTo(labelModel, {foreignKey: 'labeled'});

labelModel.hasMany(labelingModel,{foreignKey: 'labeled'});
labelModel.hasMany(labelModel,{foreignKey: 'parentId'});
labelModel.belongsTo(labelModel, { foreignKey: 'parentId'});
labelModel.hasMany(assignmentModel,{foreignKey: 'category_id'});

assignmentModel.hasMany(labelingModel, {foreignKey: 'assignment_id'});
assignmentModel.belongsTo(userModel, {foreignKey: 'assign_to'});
assignmentModel.belongsTo(userModel, {foreignKey: 'assign_by'});
assignmentModel.belongsTo(labelModel, {foreignKey: 'category_id'})

userModel.hasMany(assignmentModel,{foreignKey: 'assign_to'});
userModel.hasMany(assignmentModel,{foreignKey: 'assign_by'});

// labelingModel.belongsTo(accountModel, {foreignKey: 'account_id'})
// test route
app.use('/try',test)
app.use('/user',user)
app.use("/api",requireJWTAuth ,[account, hierarchy, labeling])
app.post('/', function (req, res) {
    res.send('Got a POST request')
  })
app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))