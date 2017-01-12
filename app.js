// requring modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const localStrategy = require('passport-local');
const path = require('path');
const flash = require('connect-flash')



//exporting router
const layout = require(__dirname+'/routes/layouts.js');
const user = require(__dirname+'/routes/user.js');




// setting the app
var app=express();



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
  resave: true ,
  saveUninitialized: true,
}));

//setting up passport middlware
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

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

// setting up flash
app.use(flash());



//setting an important global varibles
app.use((req,res,next)=>{
  res.locals.successMessage=req.flash("success") || null || req.flash("successMessage");
  res.locals.failureMessage=req.flash("error") || null || req.flash("failureMessage") ;
  res.locals.user=req.user || null;
  next();
});
//router middlware

app.use("/layout",layout);
app.use("/user",user);
app.use("/auth",user);

//setting up the static file folder
app.use(express.static(__dirname+"/public"));

//listning...
app.listen(3000,(err)=>{
  console.log("listning to the port number 3000 ...");
});
