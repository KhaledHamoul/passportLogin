const passport = require('passport') , FacebookStrategy= require('passport-facebook').Strategy;
const UserPrototype = require('../models/user');
user=new UserPrototype({});
module.exports=new FacebookStrategy(
  {
    clientID: "808855879262183",
    clientSecret: "b2d9d3a5b70590ac95ceb5f56bf667dd",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },(accessToken, refreshToken, profile, done)=>{
     user.getUserByFacebookId(profile.id,(err,userCredential)=>{
        if(err) return done(null,false);
        if(userCredential){
            // the user facebook id is found
            return done(null,userCredential);
        }else{
          // the user is not foud , we will creat a new account for this user

            user.facebook.id=profile.id;
            user.facebook.name=profile.displayName

          user.save((err)=>{
               if(err) return done(null,false); else return done(null,user);

          });

        }
     });
  }
);
