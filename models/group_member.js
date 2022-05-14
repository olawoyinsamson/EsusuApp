var mongoose = require("mongoose");
var groupMemberSchema = mongoose.Schema({
    GroupId : {
        type : String,
        required : true
    },
    UserId : {
        type : String,
        required : true
    }
})

var group_member = module.exports = mongoose.model("groupMember",groupMemberSchema);