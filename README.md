# EsusuApp
Esusu Confam Ltd


User registration data format
{
	"FirstName" : "Samson",
	"LastName" : "Olawoyin",
	"Username" : "olawoyin.samson",
	"Email"    : "samson@yahoo.com",
	"Phone"    : "08035561859",
	"Password" : "123"
}

User login expected data
{
	"Username" : "olawoyin.samson",
	"Password" : "123"
}

new group expected data
{
	"Name" : "Group1",
	"Description" : "The first contribution group",
	"PeriodicAmount" : 10000,
	"Capacity"    : 10,
	"GroupType"    : "private"
}

------------------ CONTRIBUTE MONEY HAS A GROUP MEMBER--------------------
ENDPOINT:
METHOD  : POST
DATA: 
  {
	  "amount" : 10000,
	  "cycle"  : 1,
	  "group"  : "Group name here" 
  }

----------------- Search for public group ---------------------------
ENDPOINT : localhost:3000/getPublicGroup
METHOD   : GET
Successful data return for public group search
{
	"Status": "Complete",
	"Code": 0,
	"msg": "Transaction successful",
	"data": [
		"Group2",
		"Group3",
		"Group4",
		"Group 5"
	]
}

The data attribute holds the result of the public group


------------------------ JOIN A GROUP -----------------------
ENDPOINT : localhost:3000/joingroup/Group2


------------------------ GET A GROUP MEMBERS -----------------------
ENDPOINT : localhost:3000/getGroupMember/:Name
METHOD   : GET
URL Varaible : Name
Description :  This endpoint required that you pass in a url variable Name which stand for the name of the group that the user created


---------------------- SEND MAIL NOTIFICATION ------------------
ENDPOINT : localhost:3000/send_groupinvitation
METHOD  : POST
DATA REQUIRED
 {
	"email"     : "example@yahoo.com",
	"group" : "Group2"
}

SUCCESS MSG
 {
	"Status"     : "Complete",
	"Code"       : 00,
	"msg"        : "Group invitation successfully sent",
	"data"       : "fhhf85885855955050505"
}
NB : The return data content is to be used to join the group followed by the user username, see the below endpoint on the completetion 

---------------------- JOIN  A GROUP VIA INVITATION LINK ------------------
ENDPOINT : localhost:3000//joinagroup/:id/:username
METHOD   : GET
DATA REQUIRED
	URL Variable ID and USERNAME



