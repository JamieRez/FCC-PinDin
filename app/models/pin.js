var mongoose = require('mongoose');

var pinSchema = mongoose.Schema ({
  title : String,
  imgUrl : String,
  userId : String,
  userName : String,
});

var Pin = mongoose.model('Pin' , pinSchema);

var deleter = function(){
  Pin.remove({} , function(err){
    if(err) throw err;
  });
}


module.exports = {Pin , deleter};
