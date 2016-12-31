const user = require('../models/user.js');
const bcrypt = require('bcryptjs');
 var layout;
exports.add=(req,rep)=>{
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
          user:newUser
    }});
  }
}

exports.find=(req,rep)=>{
  var perUser=new user({});


 req.checkBody('username', 'username is required').notEmpty();
 req.checkBody('password', 'not the same password').notEmpty();

  errors=req.validationErrors();
 if(errors){
     layout="../layouts/login";
     rep.status(400).render("template/app",{data:{
                    layout,
                    errors
                  }
                });
 }else{

  perUser.username=req.body.username,
  user.findOne({username:perUser.username},(err,result)=>{
     if(!err){
          if(result){
                bcrypt.compare(req.body.password,result.password,(err,res)=>{
                  if(!err){
                       if(res){
                         layout="../layouts/index";
                         perUser=result;
                         rep.render("template/app",{data:{
                               layout,
                               user:perUser
                         }});
                       }
                  }
                });
          }else{
            layout="../layouts/login";
            rep.status(401).render("template/app",{data:{
                           layout,
                           unknownUser:true,
                         }
                       });
          }
     }else{
       throw err;
     }

  });


}
}
