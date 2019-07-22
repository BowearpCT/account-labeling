var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var labeling = require("./routes/labeling")
var account = require("./routes/account")
var label = require("./routes/label")
var test = require("./routes/test-routes")
var cors = require("cors")
var port = 3000


const accountModel = require("./model/account-model")
const labelModel = require("./model/label-model")
const userModel = require("./model/user-model")
const labelingModel = require("./model/labeling-model")

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use("/api", account)
// set associate
accountModel.hasMany(labelingModel, {foreignKey: 'account_id'})
labelingModel.belongsTo(accountModel, {foreignKey: 'account_id'})
labelModel.hasMany(labelingModel,{foreignKey: 'label_id'})
labelingModel.belongsTo(labelModel, {foreignKey: 'label_id'})
userModel.hasMany(labelingModel,{foreignKey: 'label_by_user_id'})
labelingModel.belongsTo(userModel, {foreignKey: 'label_by_user_id'})
// labelingModel.belongsTo(accountModel, {foreignKey: 'account_id'})
// test route
app.use('/try',test)
app.use("/api", [account, label, labeling])
app.post('/', function (req, res) {
    res.send('Got a POST request')
  })
app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))