exports.sendLayout=(req,res,next)=>{
  var layout="../layouts/"+req.params.layout;
  res.render("template/app",{data:{
                                      layout
                                    }});
                              next();
}
