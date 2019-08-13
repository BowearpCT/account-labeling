var express = require('express')
var router = express.Router()
const userModel = require("../model/user-model")
const jwt = require("jwt-simple");

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        username: req.body.username
      },
      raw: true
    })
    if (!user) {
      return res.status(401).send("wrong username");
    }
    if (req.body.password != user.password) {
      return res.status(401).send("wrong password");
    }
    const payload = {
      username: req.body.username,
      role: user.role_id,
      iat: new Date().getTime()
    };
    const SECRET = "MY_SECRET_KEY";
    res.send(jwt.encode(payload, SECRET));
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
