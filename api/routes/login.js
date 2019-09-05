var express = require('express')
var router = express.Router()
const jwt = require("jwt-simple");
const { findUserByUsername } = require("../helper/query")

router.post("/login", async (req, res) => {
  try {
    const user = await findUserByUsername(req.body.username);
    if (!user) {
      return res.status(401).send("wrong username");
    }
    if (req.body.password != user.password) {
      return res.status(401).send("wrong password");
    }
    const payload = {
      id: user.id,
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
