var express = require("express");
var router = express.Router();
var userSchema = require('../models/user');
var groupSchema = require('../models/group');
var groupMemberSchema = require('../models/group_member');
var contributionSchema = require('../models/contribution');
var invitationSchema = require('../models/groupInvitation');
var nodemailer = require("nodemailer");
var bcrypt = require("bcrypt");
const user = require("../models/user");
const { default: mongoose } = require("mongoose");
var salt = bcrypt.genSaltSync(10);
var sess;
var API_URL = "https://esusuapp.heroku.com/";

router.post("/register",function(req,res){
    var form = req.body;
    var resBody = {};

    userSchema.find({"Username": form.Username}, function(err,user){
        if (err) console.log(err);
        if(user.length == 0){
            var new_user  = new userSchema({
                FirstName : form.FirstName,
                LastName  : form.LastName,
                Email     : form.Email,
                Phone     : form.Phone,
                Username  : form.Username,
                Password  : bcrypt.hashSync(form.Password, salt)
            });
            new_user.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    resBody = {Status : "Complete", Code : 00,msg : "User registration successful"};
                    res.send(resBody);
                }
            })
            
        }else{
            resBody = {Status : "Error", Code : 01,msg : "User Username "+form.Username+" Has been taken, try again"};
            res.send(resBody);
        }
        
    });
})

router.post("/login", async function(req,res){
    var form = req.body;
    var resBody = {};

    // Find user data in the user collection
    userSchema.find({Username : form.Username},function(err,user){
        if(err) console.log(err);
        
        if(user.length == 0){
            resBody = {Status : "Error", Code : 01,msg : "User Username "+form.Username+" not found, try again"};
            res.send(resBody);
        } else{

            // Comparing user password with the saved database password
            bcrypt.compare(form.Password,user[0].Password,function(err,result){

                // Checking if password is valid
                if(result){
                    // saving successful login userid into session variable
                    sess = req.session;
                    sess.userid = user[0]._id; 

                    res.send({Status : "Complete",Code : 00, msg : "Login successful"});
                }else {
                    res.send({Status : "Error",Code : 01, msg : "Invalid password, please try again"});
                }
            });
        }
    })
})

router.get("/logout",function(req,res){
    sess = req.session;
    delete sess.userid;
    res.send({Status : "Complete" , Code : 00,msg : "User logout successfully"});
})

router.post("/createGroup",function(req,res){
    var form = req.body;
    if(req.session.userid == undefined){
        res.send({Status : "Error",Code : 01 , msg : "Please login to gain access this end point"});
    }else{
        groupSchema.find({Name : form.Name},function(err,group){
            if(err) console.log(err);
            if(group.length == 0){
                var group = groupSchema({
                    Name : form.Name,
                    Description : form.Description,
                    Capacity   : form.Capacity,
                    PeriodicAmount : form.PeriodicAmount,
                    GroupType : form.GroupType,
                    Admin     : req.session.userid
                });
                group.save(function(err){
                    console.log(err);
                    res.send({Status : "Complete",Code : 00 , msg : "Group name :"+form.Name+" successfully created"});
                })
            } else{
                res.send({Status : "Error",Code : 01 , msg : "Group name :"+form.Name+" already exist, please try again"});
            }
        })
    }
})

router.get("/getPublicGroup",async function(req,res){
    var rt = []
    if(req.session.userid == undefined){
        res.send({Status : "Error",Code : 01 , msg : "Please login to gain access this end point"});
    }else{
        groupSchema.find({GroupType : "public"},function(err,group){
            if(err) console.log(err);
            for(var x=0;x<group.length;x++){
                rt.push(group[x].Name);
            }
            res.send({Status : "Complete",Code : 00 , msg : "Transaction successful", data : rt});
        })
    }    
})

router.get("/joingroup/:name", async function(req,res){
    var Name = req.params.name;
    var group_id  = 0;

    // Ensure user login 
    if(req.session.userid == undefined){
        res.send({Status : "Error",Code : 01 , msg : "Please login to gain access this end point"});
    }else{ 
        // Get group details
        groupSchema.find({Name : Name},function(err,group){
            if(err) console.log(err);
            group_id = group[0]._id;
            // Check group member collection to get total group member
 
            groupMemberSchema.find({GroupId : group._id},function(err,group_m){
                if(group_m.length == group.Capacity){
                    res.send({Status : "Error",Code : 01 , msg : "Group capacity reached, please join another group"})
                } else{
                    // Check if current user already joined current group
                    groupMemberSchema.find({UserId : req.session.userid},function(err,group_member){
                        if(err) console.log(err)
                        if(group_member.length == 0){
                            var gMember = new groupMemberSchema({
                                GroupId : group_id,
                                UserId  : req.session.userid
                            });
                            gMember.save(function(err){
                                if(err) console.log(err);
                                res.send({Status : "Complete",Code : 00 , msg : "You have successfully joined group : "+Name});
                            })
                        }else{
                            res.send({Status : "Error",Code : 01 , msg : "You can only be a member of one group"})
                        }
                    })
                }
            });

        })
    }
})

router.get("/getGroupMember/:Name", async function(req,res){
    var Name = req.params.Name;
    sess = req.session;
    
    // Ensure that user is login
    if(sess.userid == undefined){
        res.send({Status : "Error",Code : 01 , msg : "Please login to gain access this end point"});
    } else{
        // Check if the user is a group admin
        groupSchema.find({$and : [{Admin : sess.userid},{Name : Name}]},function(err,group){
            if(err) console.log(err)

            if(group.length == 0){
                res.send({Status : "Error" , Code : 01 , msg : "Your are not the admin of group "+ Name});
            } else{
							var rt  = [];

							groupMemberSchema.find({GroupId : group[0]._id},function(err,group_member){
								if(err) console.log(err);
								for(var x=0;x<group_member.length;x++){
									rt.push(userSchema.findById({_id : group_member[x].UserId}));                     
								}

								res.send({Status : "Complete" , Code : 00 , msg : "Transaction successful", data : rt2});
							});	
            }
        })
    }

})

router.post("/contribute", async function(req,res){
    var form  = req.body;
    var Amount = form.Amount;
    var Cycle  = form.Cycle;
    var Name  = form.group;

    //Ensure login
    if(sess.userid == undefined){
        res.send({Status : "Error",Code : 01 , msg : "Please login to gain access this end point"});
    } else{
        // get user group 
        groupSchema.find({Name : Name},function(err,group){
            if(err) console.log(err);
            // Check if user is a group member before making contribution
						console.log(group);
            groupMemberSchema.find({$and : [{GroupId : group[0]._id},{UserId : sess.userid}]},function(err,group_m){
                if(err) console.log(err);
                if(group_m.length == 0){
                    res.send({Status : "Error",Code : 01 , msg : "You are not a member of Group "+ Name});
                } else{
                    // Check if user contribution amount meet the group amount
                    if(group[0].PeriodicAmount == Amount){
                        // Check if user have already contributed for the current cycle
                        contributionSchema.find({$and : [{GroupId : group[0]._id},{GroupMemberId : group_m[0]._id},{Cycle : Cycle}]},function(err,group_contribution){
                            if(err) console.log(err);
                            if(group_contribution.length != 0){
                                res.send({Status : "Error",Code : 01 , msg : "You you have already contributed for this cycle "+Cycle});
                            }else{
                                var contributeNow = new contributionSchema({
                                    GroupId : group[0]._id,
                                    GroupMemberId : group_m[0]._id,
                                    Cycle  : Cycle,
                                    Amount  : Amount,
																		Paid    : false
                                });

                                contributeNow.save(function(err){
                                    if(err) console.log(err);
                                    res.send({Status : "Complete",Code : 00 , msg : "Periodic contribution saved successfully."});
                                })
                            }
                        })
                    }else{
                        res.send({Status : "Error",Code : 01 , msg : "You cannot contribute less than the group periodic amount of "+ group[0].PeriodicAmount});
                    }
                }
            })
        })
    }
})

router.post("/send_groupinvitation", async function(req,res){
    var form = req.body;
    var email            = form.email;
    var group_name       = form.group;

    // Ensure user login 
    if(req.session.userid == undefined){
        res.send({Status : "Error",Code : 01 , msg : "Please login to gain access this end point"});
    }else{ 
        var now = new Date();
        var new_invitation = new invitationSchema({
            GroupName : group_name,
            CreatedBy  : sess.userid,
            Date       : now.toISOString(),
						Valid      : true
        });

        new_invitation.save(function(err,invitation){
          if(err) console.log(err);
					var mail = {}
					mail.To = email;
					mail.Subject = "Esusu Group "+group_name+" Invitation";
					mail.Body = "Hello "+email+" the following is your group invitation code = "+invitation._id;
					sendMail(mail);
					res.send({Status : "Complete",Code : 00 , msg : "Group invitation successfully sent", data : invitation._id});
        })
    }
})

router.get("/joinagroup/:id/:username", async function(req,res){
	var id = req.params.id;
	var username  = req.params.username;
    // Ensure user login 
    if(req.session.userid == undefined){
			res.send({Status : "Error",Code : 01 , msg : "Please login to gain access this end point"});
		} else{ 	
			//chech if group link still valid
			invitationSchema.findById(id, function(err,invitation){
				if(err) console.log(err);
				if(invitation.Valid == true){
					// Check if username is valid
					groupSchema.find({Name : invitation.GroupName}, function(err, group){
						if(err) console.log(err);
            groupMemberSchema.find({GroupId : group._id},function(err,group_m){
							// Check the group capacity to know if new user can join group
							if(group_m.length == group.Capacity){
									res.send({Status : "Error",Code : 01 , msg : "Group capacity reached, please join another group"})
							} else{
									userSchema.find({Username : username},function(err,user){
										// Check if current user already joined current group
										groupMemberSchema.find({UserId : user[0]._id},function(err,group_member){
											if(err) console.log(err)
											if(group_member.length == 0){
													var gMember = new groupMemberSchema({
															GroupId : group[0]._id,
															UserId  : user[0]._id
													});
													gMember.save(function(err){
															if(err) console.log(err);
															// Flag the invitation unique code to false
															console.log(invitation);
															invitationSchema.findByIdAndUpdate(invitation._id,{Valid : false});

															// Send  a response back
															res.send({Status : "Complete",Code : 00 , msg : "You have successfully joined group : "+group[0].Name});
													})
											}else{
													res.send({Status : "Error",Code : 01 , msg : "You can only be a member of one group"})
											}
										})										
									})
							}
					});						
					})					
				} else{
					res.send({Status : "error", Code : 01, msg : "group invitation ID : "+id+" has been used, please request a new link from group admin"});
				}
			})
		}
})

function sendMail(mailData) {
    let mailTransporter = nodemailer.createTransport({
        port: "465",
        host : "smtp.zoho.com",
        auth: {
          user: "omedicalapp@zohomail.com",
          pass: "1Q2W3E4R5T@2022"
        }
    });
      
    // Setting credentials
    let mailDetails = {
        from: "omedicalapp@zohomail.com",
        to: mailData.To,
        subject: mailData.Subject,
        text: mailData.Body
    };
      
      
    // Sending Email
    mailTransporter.sendMail(mailDetails, 
                    function(err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent successfully to"+ mailData.To);
        }
    });
  };

module.exports = router;