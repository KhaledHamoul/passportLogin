const express = require('express');
const passport = require('passport');

exports.killSession=(req,res)=>{
  req.logout();
  res.redirect("/layout/login");
}
