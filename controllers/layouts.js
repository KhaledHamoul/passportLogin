exports.sendLayout=(req,rep)=>{
  var layout="../layouts/"+req.params.layout;
  rep.render("template/app",{data:{
                                      layout
                                    }});

}
