const passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
const UserPrototype = require('../models/user');

user=new UserPrototype({});
module.exports=new LocalStrategy(
  function(usernameOrEmail,password,done) {
        user.getUserByUsernameOrEmail(usernameOrEmail,null,(err,userCredential)=>{
          if(err) throw err ;
          if(!userCredential) {
            return done(null,false,{message:"no such uername or email"}); // with an error massege
          }
          user.comparePassword(password,userCredential.local.password,(err,isMatch)=>{
              if (isMatch) {
                return done(null,userCredential,{message:'you are logged in'});

              } else {
                return done(null,false,{message:"invalid password"}); // with an error message
                // password doesn't match and the log in is impossible
              }
          });

        });

    }
)
