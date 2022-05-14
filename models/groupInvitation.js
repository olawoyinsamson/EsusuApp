var mongoose = require("mongoose");
var groupInvitationSchema = mongoose.Schema({
    GroupName : {
        type : String,
        required : true
    },
    CreatedBy :{
        type : String,
        required : true
    },
    Date : {
        type : Date,
        required : true
    },
    Valid : {
        type : Boolean,
        required : true
    }    
})

var groupInvitation = module.exports = mongoose.model("groupinvitation",groupInvitationSchema);