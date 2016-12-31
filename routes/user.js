const express = require('express');
const user = require('../controllers/users');
var router=express.Router();
router.route("/register").post(user.add);
router.route("/login").post(user.find);

module.exports=router;
