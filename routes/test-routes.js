var express = require('express');
var router = express.Router();
const Sequelize = require("sequelize");

const accountModel = require("../model/account-model");
const labelModel = require("../model/label-model");
const userModel = require("../model/user-model");
const assignmentModel = require("../model/assignment-model");
const roleModel = require("../model/role-model");
const countryModel = require("../model/country-model");
const channelModel = require("../model/channel-model");
const labelingModel = require("../model/labeling-model");
const Op = Sequelize.Op

router.get("/accounts", async (req, res) => {
  try {
    let account = await accountModel.findAll({
    });
    res.send(account);
  } catch (error) {
    res.send(error)
  }
})

router.get("/labels", async (req, res) => {
  try {
    let labels = await labelModel.findAll({
      hierarchy: true
    })
    res.send(labels);
  } catch (error) {
    res.send(error);
  }
})
// router.get("/labels", async (req, res) => {
//   try {
//     let account = await labelModel.findAll({
//       hierarchy = true
//     });
//     res.send(account);
//   } catch (error) {
//     throw error;
//   }
// })

router.get("/users", async (req, res) => {
  try {
    var users = await labelModel.findAll({
      where: {
        role: "user"
      }
    })
    res.send(users)
  } catch (error) {
    res.send(error)
  }
})

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/labels', function (req, res) {
  labelModel.findAll()
    .then(labels => {
      res.json(labels)
    })
    .catch(err => {

      res.send("error :" + err)
    })
})

router.get('/labeling', function (req, res) {
  labelingModel.findAll()
    .then(labelings => {
      res.json(labelings)
    })
    .catch(err => {
      res.send("error :" + err)
    })
})


router.get('/unlabel', function (req, res) {
  accountModel.findAll({
    where: {
      '$labelings.id_labeling$': 2
    },
    include: [{
      model: labelingModel
    }],
  })
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      res.send("error :" + err)
      console.log(err)
    })
})

router.get('/test', (req, res) => {
  labelingModel.findAll({
    // where: {
    //     id_account : "c"
    // },
    include: [{
      model: accountModel
    }],
  })
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      res.send("error :" + err)
      console.log(err)
    })
})

// test query database 

// define the about route
router.get('/about', function (req, res) {
  res.send('About ME')
})

module.exports = router