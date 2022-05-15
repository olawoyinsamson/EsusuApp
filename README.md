# EsusuApp
<h1>Esusu Confam Ltd </h1> <br>

<h3>------------------ USER REGISTRATION-------------------- </h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/register
METHOD   : POST<br>

User registration data format
{
	"FirstName" : "Samson",
	"LastName" : "Olawoyin",
	"Username" : "olawoyin.samson",
	"Email"    : "samson@yahoo.com",
	"Phone"    : "08035561859",
	"Password" : "123"
}
<br>

<h3>----------------- LOGIN ---------------------------</h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/login
METHOD   : POST

User login expected data
{
	"Username" : "olawoyin.samson",
	"Password" : "123"
}
<br>
<h3>----------------- LOGOUT ---------------------------</h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/logout
METHOD   : GET
Description : To logout current user
<br>

<h3>------------------ CREATE NEW GROUP ----------------------</h3> <br>
ENDPOINT : https://esusuapp-api.herokuapp.com/createGroup  <br>
METHOD   : POST<br>

new group expected data
{
	"Name" : "Group1",
	"Description" : "The first contribution group",
	"PeriodicAmount" : 10000,
	"Capacity"    : 10,
	"GroupType"    : "private"
}
<br>

<h3>------------------ CONTRIBUTE MONEY HAS A GROUP MEMBER--------------------</h3><br>
ENDPOINT: https://esusuapp-api.herokuapp.com/contribute<br>
METHOD  : POST
DATA: 
  {
	  "amount" : 10000,
	  "cycle"  : 1,
	  "group"  : "Group name here" 
  }
<br>

<h3>----------------- Search for public group ---------------------------</h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/getPublicGroup <br>
METHOD   : GET <br>
Successful data return for public group search <br>
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

<br>
<h3>------------------------ JOIN A GROUP -----------------------</h3>
ENDPOINT : https://esusuapp-api.herokuapp.com/joingroup/:GroupName <bR>
METHOD   : GET <br>
DATA : URL Variable Group name
Description : GroupName in the URL is should a group name that the user want to join
<br>

<h3>------------------------ GET A GROUP MEMBERS -----------------------</h3>
ENDPOINT : https://esusuapp-api.herokuapp.com/getGroupMember/:Name <br>
METHOD   : GET
URL Varaible : Name
Description :  This endpoint required that you pass in a url variable Name which stand for the name of the group that the user created

<br>
<h3>---------------------- SEND MAIL NOTIFICATION ------------------</h3> <br>
ENDPOINT : https://esusuapp-api.herokuapp.com/send_groupinvitation <br>
METHOD  : POST <br>
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
<p>NB : The return data content is to be used to join the group followed by the user username, see the below endpoint on the completetion.  </p>
<br>


<h3>---------------------- JOIN  A GROUP VIA INVITATION LINK ------------------ </h3> <br>
ENDPOINT : https://esusuapp-api.herokuapp.com/joinagroup/:id/:username <br>
METHOD   : GET <br>
DATA REQUIRED <br>
	URL Variable ID and USERNAME



