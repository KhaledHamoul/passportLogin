$(function(){

//the indexe page requests
$app=$("body").find("div#app");
$app.find("input.api").click(function(event) {
  $target=$(this).attr("name");
  $.get('/connect/'+$target,function(data, textStatus, xhr) {
     $("body").html(data);
   });
});
$app.find("form").submit(function(event) {
  var api="/forms/"+$(this).attr('id')
  var data=$(this).serialize();
   $.ajax({
     url: api,
     type: 'POST',
     dataType: 'text',
     data,
     success:function(data,status) {
      document.write(data);
     },
     error:function(error) {
      if(error.status==401) console.log("user exist");
    }

  });



});

});
