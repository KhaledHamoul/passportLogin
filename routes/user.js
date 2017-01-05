const express = require('express');
const passport = require('passport');

const register = require('../controllers/registration');
const LocalLogin = require('../controllers/passportLocalLogIn');
const facebookLogin = require('../controllers/passportFacebookLogin');
const logout = require('../controllers/logout');

const UserPrototype = require('../models/user');
const User= new UserPrototype({});



var router=express.Router();

// the registration api
router.route("/register").post(register.addUser);

// the logout api
router.route("/logout").get(logout.killSession);

//local passport strategy
passport.use(LocalLogin);

//facebook passport strategy
passport.use(facebookLogin);

/// the passport session middleware
passport.serializeUser((user, done)=>{
                done(null, user._id);
            });

passport.deserializeUser((id, done)=>{
  User.getUserById((err, user)=>{
                  done(err, user);
            });
        });


router.route("/login").post(passport.authenticate('local'),(req, res)=>{
     res.redirect("/layout/index");
});

router.route('/facebook').get(passport.authenticate('facebook'));

router.route('/facebook/callback').get(passport.authenticate('facebook'),(req, res)=>{
     res.redirect("/layout/index");
});






module.exports=router;
