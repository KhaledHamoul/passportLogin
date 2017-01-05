const UserPrototype = require('../models/user.js');
const bcrypt = require('bcryptjs');
 var layout;
 var user=new UserPrototype({});
 var errorsContainer=new Array();

 exports.addUser=(req,res)=>{

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
    user.username=req.body.username;
    user.local.name =req.body.name;
    user.email=req.body.email;
    user.local.wilaya =req.body.city;
    user.local.birthday=req.body.birthday;


    // checking if te user dosn't exist
     user.getUserByUsernameOrEmail(user.username,user.email,(err,isExisted)=>{
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

             if(isExisted.username==newUser.username){
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
                                                errors:errorsList
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
                                                    errors:errorsList
                                                  }
                                                });
                         }
                    });
                 });

                 //sending the user to his dashboard
                 layout="../layouts/index";
                 res.locals.user= user;
                 res.render("template/app",{data:{
                       layout,
                 }});
               }

     });


    }

}
