module.exports=(req,res,next)=>{

if(req.params.layout=="index"){

    var layout="../layouts/login";
    res.redirect("/layout/login");

  }else{

  next();
        }
}
