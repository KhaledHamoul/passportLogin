exports.add=(req,rep)=>{
   const user = require('../models/user.js');
    var layout;
    var newUser=new user({});


   req.checkBody('username', 'username is required').notEmpty();
   req.checkBody('name', 'name is required').notEmpty()
   req.checkBody('email', 'Invalid eamil adress').isEmail();
   req.checkBody('password', 'not the same password').equals(req.body.password2)

   var errors=req.validationErrors();
   if(errors){
       layout="../layouts/register";
       rep.render("template/app",{data:{
                      layout,
                      errors
                    }
                  });
   }else{

    newUser.username=req.body.username,
    newUser.name =req.body.name,
    newUser.email=req.body.email,
    newUser.wilaya =req.body.city,
    newUser.birthday=req.body.birthday,

    newUser.hashPassword(req.body.password,(err,hash)=>{
      if(!err){
        newUser.password=hash;
        newUser.save((err)=>{
            console.log("user has been saved");
        });
      }else{
        throw err;
      }
    });
    layout="../layouts/index";
    rep.render("template/app",{data:{
          layout,
          newUser
    }});
  }
}
