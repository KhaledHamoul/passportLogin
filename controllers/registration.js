const UserPrototype = require('../models/user.js');
const bcrypt = require('bcryptjs');
 var layout;
 var user;;
 var errorsContainer= Array;

 exports.addUser=(req,res)=>{
   if(req.user) user=req.user; else user=new UserPrototype({})
   // validating the user inuput
   errorsContainer=user.validateFormInputs(req);
   if(errorsContainer){
       layout="../layouts/register";
       res.render("template/app",{data:{
                      layout,
                      errorsContainer
                    }
                  });
   }else{


    // hydration
    user.local.username=req.body.username;
    user.local.name =req.body.name;
    user.local.email=req.body.email;
    user.local.wilaya =req.body.city;
    user.local.birthday=req.body.birthday;


    // checking if te user dosn't exist
     user.getUserByUsernameOrEmail(user.local.username,user.local.email,(err,isExisted)=>{
                 if(err){
                   layout="../layouts/register";
                   errorsContainer.push("try again , something went wrong");
                   res.render("template/app",{data:{
                                  layout,
                                  errorsContainer : errorsList
                                }
                              });
                 }

           if(isExisted){

             if(isExisted.local.username==user.local.username){
               errorsContainer.push("username already exists");
             }else{
                errorsContainer.push("email already exists")
             }
             //sending the user back to the registration layout
             layout="../layouts/register";
             res.render("template/app",{data:{
                            layout,
                            errors:errorsContainer
                          }
                        });

           }else{
                 // creating a hashed passord using bcrypt
                 user.hashPassword(req.body.password,(err,hashedPassword)=>{
                    if(err)  {
                                layout="../layouts/register";
                                errorsContainer.push("try again , something went wrong");
                                 res.status(400).render("template/app",{data:{
                                                layout,
                                                errorsContainer
                                              }
                                            });
                              }
                    user.local.password=hashedPassword;
                    user.save((err)=>{
                         if(err)  {
                                     layout="../layouts/register";
                                     errorsContainer.push("try again , something went wrong");
                                     res.staus(400).render("template/app",{data:{
                                                    layout,
                                                    errorsContainer
                                                  }
                                                });
                         }
                    });
                 });

                 //sending the user to his dashboard
                 layout="../layouts/index";
                 res.locals.user= user;
                 req.flash("successMessage","you have been registerd");
                 res.render("template/app",{data:{
                       layout,
                 }});
               }

     });


    }

}
