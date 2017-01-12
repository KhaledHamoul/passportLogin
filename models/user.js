const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const  PasswordHashingCycle = 8;

mongoose.connect('mongodb://localhost:27017/yourDatabase');

var userSchema=new mongoose.Schema({
local:{
  name :{
    type:String,
    lowercase:true,
  },
  username:{
    type: String,
    unique:true,
  },
  email:{
    type:String,
    index:true,
    unique: true,
  },
  wilaya :{
    type: String,
  },
  password:{
    type: String,
  },
  birthday:{
    type:Date,
  }
},
facebook:{
    id:{
      type:String,

    },
    name:{
      type:String,

    },
    token:{
      type:String,
    }
},
  registerDate:{
    type:Date,
    default:new Date,
  },

});


userSchema.methods.getUserByUsernameOrEmail=(username,email,callback)=>{
     user.findOne({
       "$or":[
                {"local.username":username},
                {"$or":[
                  {"local.email":email},
                  {"local.email":username} // in the case the user want to login with his email
              ]
            }
          ]

     },callback);
   }

userSchema.methods.getUserById=(id,callback)=>{
    user.findById(id,callback);
}

userSchema.methods.comparePassword=(password,DBpassword,callback)=>{
    bcrypt.compare(password,DBpassword,callback);
}

userSchema.methods.hashPassword=(password,callback)=>{
      bcrypt.genSalt(PasswordHashingCycle,(err,salt)=>{
        if(!err){
            bcrypt.hash(password,salt,callback);
          }else{
            console.log("salt generation is not working");
          }
        });
      }

userSchema.methods.validateFormInputs=(req)=>{
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('email', 'Invalid eamil adress').isEmail();
  req.checkBody('password', 'unmatch passwords').equals(req.body.password2);

  var errors=req.validationErrors();
  for (var i = 0; i < errors.length; i++) {
    errors[i]=errors[i].msg;
  }
  return errors;
}

userSchema.methods.getUserByFacebookId=(userFacebookId,callback)=>{
  user.findOne({"facebook.id":userFacebookId},callback);
}


var user=mongoose.model('user',userSchema);
module.exports=user;
