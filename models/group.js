var mongoose = require("mongoose");
var groupSchema = mongoose.Schema({
    Name : {
        type : String,
        required :true
    },
    Description : {
        type : String,
        required : true
    },
    PeriodicAmount : {
        type : Number,
        required : true
    },
    GroupType : {
        type : String,
        required : true
    },
    Capacity :{
        type : Number,
        required : true
    },
    Admin : {
        type : String,
        required : true
    }
});

var group = module.exports = mongoose.model("group",groupSchema);