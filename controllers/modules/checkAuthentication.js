module.exports=(req,res,next)=>{
if(req.params.layout=="index" && !res.locals.user){

    var layout="../layouts/login";
    res.redirect("/layout/login");

  }else{

  next();
        }
}
