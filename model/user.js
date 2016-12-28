const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/letsMeet');

var userSchema=new mongoose.Schema({
  username:{
    type: String,
    required:true,
  }
  name :{
    type:String,
    required:true,
    lowercase:true,
  }
  email:{
    type:String,
    required:true,
    unique:true,
    index=true,
  }
  wilaya :{
    type: String,
    required:true,
  }
  password:{
    type: String,
    required:true,

  }
  Password2:{
    type: String,
    required:true,
  }
  birthday:{
    type:Date;
  }
  registerDate:{
    type:Date;
    default:new Date,
  }

});
var salt=bcrypt.genSalt(8);
userSchema.method.hashPassword=(password,callback)=>{
     bcrypt.hash(password,salt,callback);
}
userSchema.method.validatePassword=(userPassword,dbPassword,callback)=>{
   bcrypt.compare(userPassword,dbPassword,callback)
}

var user=mongoose.modle('user',userSchema);
module.exports=user;
