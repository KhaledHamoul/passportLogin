// requring modules
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const path = require('path');


//exporting router
const layout = require(__dirname+'/routes/layouts.js');
const user = require(__dirname+'/routes/user.js');



// connecting to the data base
mongoose.connect('mongodb://localhost:27017/letsMeet');
var db=mongoose.connection;

// setting the app
var app=express();

//setting up the static file folder
app.use(express.static(__dirname+"/public"));

//setup the view engine
app.set("views",path.join(__dirname,"views"));
app.set('view engine','ejs');



//setting up body-parser and cookie parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());



//setting up express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
// setting up express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//setting up passport middlware
app.use(passport.initialize());
app.use(passport.session());

//router middlware

app.use("/layout",layout);
app.use("/user",user);


//listning...
app.listen(3000,(err)=>{
  console.log("listning ...");
});
