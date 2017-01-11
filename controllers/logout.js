const express = require('express');
const passport = require('passport');

exports.killSession=(req,res,next)=>{
  req.logout();
  req.flash("successMessage","you are logedout");
  res.redirect("/layout/login");
  next();
}
