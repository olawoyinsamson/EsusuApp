var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    FirstName : {
        type : String,
        required : true
      },
      LastName : {
        type : String,
        required : true
      },
      Email : {
          type : String,
          required : true
      },
      Phone : {
          type : String,
          required : true
      },
      Username : {
          type : String,
          required : true
      },
      Password : {
          type : String,
          required : true
      }    
})

var user = module.exports = mongoose.model("user",userSchema);