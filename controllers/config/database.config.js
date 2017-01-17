const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/yourDatabase');
module.exports=mongoose.connection();
