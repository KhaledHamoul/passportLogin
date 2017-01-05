const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


const register = require('../controllers/registration');
const LocalStrategy = require('../controllers/passportLocalLogIn');
const faceBookStrategy = require('../controllers/passportFacebookLogin');
const logout = require('../controllers/logout');
const usermoddel = require('../models/user');
var User = new usermoddel;
var router=express.Router();
router.route("/register").post(register.addUser);
router.route("/logout").get(logout.killSession);

/// the passport session middleware
passport.use(LocalStrategy.login);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    console.log("deserializeUser"+user);
    done(err, user);
  });
});


router.route("/login").post(passport.authenticate('local',{failureRedirect: '/layout/register'}),
    function(req, res) {
         res.redirect("/layout/index");
    });
module.exports=router;
