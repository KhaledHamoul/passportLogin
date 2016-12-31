const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/letsMeet');

var userSchema=new mongoose.Schema({
  username:{
    type: String,
    required:true,
    unique:true,
  },
  name :{
    type:String,
    required:true,
    lowercase:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    index:true,
  },
  wilaya :{
    type: String,
    required:true,
  },
  password:{
    type: String,
    required:true,

  },
  birthday:{
    type:Date,
  },
  registerDate:{
    type:Date,
    default:new Date,
  },

});
var salt=bcrypt.genSalt(8);
userSchema.methods.hashPassword=(password,callback)=>{
      bcrypt.genSalt(8,(err,salt)=>{
        if(!err){
            bcrypt.hash(password,salt,callback);
          }else{
            throw err;
          }
      });
}

var user=mongoose.model('user',userSchema);

module.exports=user;
