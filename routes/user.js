const express = require('express');
const passport = require('passport');

const register = require('../controllers/registration');
const LocalLogin = require('../controllers/passportLocalLogIn');
const facebookLogin = require('../controllers/passportFacebookLogin');
const logout = require('../controllers/logout');
const flash = require('connect-flash');
const UserPrototype = require('../models/user');
const User= new UserPrototype({});



var router=express.Router();



//local passport strategy
passport.use(LocalLogin);

//facebook passport strategy
passport.use(facebookLogin);

/// the passport session middleware
passport.serializeUser((user, done)=>{
                done(null, user._id);
            });

passport.deserializeUser((id, done)=>{
  User.getUserById(id,(err, user)=>{
                  done(err, user);

            });
        });



// the registration api
router.route("/register").post(register.addUser);

// the logout api
router.route("/logout").get(logout.killSession);


// the login apî with passport strategy
router.route("/login").post(passport.authenticate('local',{ failureRedirect:'/layout/login', failureFlash: true, successFlash:true}),(req, res)=>{
     res.redirect("/layout/index");
});
// the facebook api with passport strategy
router.route('/facebook').get(passport.authenticate('facebook',{ failureRedirect:'/layout/login' ,failureFlash: true, successFlash:true}));


// the facebook callback
router.route('/facebook/callback').get(passport.authenticate('facebook',
      { failureRedirect:'/layout/login' ,failureFlash: true ,successFlash:true}),
      (req, res)=>{
          res.redirect("/layout/index");
});


//connect with facebook account
router.route('/connect/facebook').get(passport.authorize('facebook', {  scope: ['email','photos'] , failureRedirect: '/account' ,failureFlash: true,successFlash:true})); /// facebook authorization

//unlink user facebook account
router.route("/unlink/facebook").get((req,res,next)=>{
     let user =req.user;
     user.facebook.token=null;
     user.save((err)=>{
       if(err) {
         req.flash('failureMessage','something went wrong try again please ! ');
         throw error ;}else{
           req.flash('successMessage','facebook account has been unlinked successfuly ! ');
         }
       res.redirect('/layout/index');
     });
});




module.exports=router;
