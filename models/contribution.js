var mongoose = require("mongoose");

var contributionSchema = mongoose.Schema({
    GroupId : {
        type : String,
        required : true
    },
    GroupMemberId : {
        type : String,
        required : true
    },
    Paid : {
        type : Boolean,
        required : false
    },
    Cycle: {
        type : Number,
        required : true
    },
    Amount : {
        type : Number,
        required : true
    }    
})

var contribution = module.exports = mongoose.model("contribution",contributionSchema);