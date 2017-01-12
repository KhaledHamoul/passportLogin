const passport = require('passport') , FacebookStrategy= require('passport-facebook').Strategy;
const UserPrototype = require('../models/user');
user=new UserPrototype({});
module.exports=new FacebookStrategy(
  {
    clientID: "808855879262183",
    clientSecret: "b2d9d3a5b70590ac95ceb5f56bf667dd",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    passReqToCallback: true
  },
    (req,accessToken, refreshToken, profile, done)=>{
      if(!req.user){
      user.getUserByFacebookId(profile.id,(err,userCredential)=>{
        if(err) return done(null,false,{message:"can't connect with your facebook account 2"});
        if(userCredential){
            // the user facebook id is found , the user will be logged in
            if(userCredential.token) return done(null,userCredential,{message:"you had logged in with your facebook acount"}); else{
                 userCredential.facebook.token=accessToken;
                 userCredential.save((err)=>{
                   if(err) return done(null,false,{message:"can't connect with your facebook account 2"}); else
                        return done(null,userCredential,{message:"you had logged in with your facebook acount"});
                 });

            }
        }else{
          // the user is not foud , we will creat a new account for this user
            user.facebook.id=profile.id;
            user.facebook.name=profile.displayName;
            user.facebook.token=accessToken;
            user.save((err)=>{
               if(err) {
                  throw err;
                  return done(null,false,{message:"can't connect with your facebook account 1"});
               }
                  else{
                    return done(null,user,{message:"you had signed in with your facebook acount"});
                  }
          });

        }
     });
   }else{
        console.log(profile);
        user=req.user;
        user.facebook.id=profile.id;
        user.facebook.token=accessToken;
        user.facebook.name=profile.displayName;
        user.save((err)=>{
            if(err) throw err;
            return done(null,user);
        });


   }
  }
);
