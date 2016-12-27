const express = require('express');
const layoutesController = require('../controllers/layoutsController');
var router=express.Router();

router.route("/:layout")
            .get(layoutesController.sendLayout);
module.exports=router;
