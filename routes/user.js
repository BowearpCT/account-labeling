var express = require('express')
var router = express.Router()
const accountModel = require("../model/account-model")
const Serializer = require('sequelize-to-json')
const labelModel = require("../model/label-model")
const userModel = require("../model/user-model")
const labelingModel = require("../model/labeling-model")
const jwt = require("jwt-simple");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// all label
router.post("/login",(req, res) => {
    userModel.findOne({
        where:{
            "username" : req.body.username 
        },
        raw: true
    })
    .then(user => {
        if(!user){
            return res.status(404).send("wrong username")
        }
        if(req.body.password != user.password){
            return res.status(404).send("wrong password")
        }
        const payload = {
            username : req.body.username,
            role : user.role,
            iat: new Date().getTime()//มาจากคำว่า issued at time (สร้างเมื่อ)
        };
        const SECRET = "MY_SECRET_KEY"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ
        res.send(jwt.encode(payload, SECRET));
        
    })
    .catch(err => {         
        res.send("error :"+ err)
    })
})

module.exports = router
