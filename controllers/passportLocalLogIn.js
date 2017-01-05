const passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
const UserPrototype = require('../models/user');

user=new UserPrototype({});
module.exports=new LocalStrategy(
  function(usernameOrEmail,password,done) {
        user.getUserByUsernameOrEmail(usernameOrEmail,null,(err,userCredential)=>{
          if(err) throw err ;
          if(!userCredential) {
            return done(null,false); // with an error massege
          }
          user.comparePassword(password,userCredential.local.password,(err,isMatch)=>{
              if (isMatch) {
                return done(null,userCredential);
              } else {
                return done(null,false); // with an error message
                // password doesn't match and the log in is impossible
              }
          });

        });

    }
)
