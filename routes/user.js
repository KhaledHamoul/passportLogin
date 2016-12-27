const express = require('express');
const user = require('../controllers/users');
var router=express.Router();

router.route("/register")
        .post(user.add);
module.exports=router;
