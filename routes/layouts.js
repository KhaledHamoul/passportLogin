const express = require('express');
const layoutesController = require('../controllers/layouts');
const checkAuthentication = require('../controllers/modules/checkAuthentication');
var router=express.Router();

router.route("/:layout")
            .get(checkAuthentication,layoutesController.sendLayout);
module.exports=router;
