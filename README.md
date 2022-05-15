# EsusuApp API Documentation

<h3>------------------ USER REGISTRATION-------------------- </h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/register <br>
METHOD   : POST<br>

User registration data format <br>
<code>
	{ <br>
		"FirstName" : "Samson", <br>
		"LastName" : "Olawoyin",<br>
		"Username" : "olawoyin.samson",<br>
		"Email"    : "samson@yahoo.com",<br>
		"Phone"    : "08035561859", <br>
		"Password" : "123" <br>
	}
</code>
<br>

<h3>----------------- LOGIN ---------------------------</h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/login <br>
METHOD   : POST <br>

User login expected data <br>
<code>
	{ <br>
		"Username" : "olawoyin.samson",<br>
		"Password" : "123" <br>
	}
</code>

<br>
<h3>----------------- LOGOUT ---------------------------</h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/logout <br>
METHOD   : GET <br>
Description : To logout current user
<br>

<h3>------------------ CREATE NEW GROUP ----------------------</h3> <br>
ENDPOINT : https://esusuapp-api.herokuapp.com/createGroup  <br>
METHOD   : POST<br>
DESCRIPTION : <mark>Group Types are [public , private]</mark><br>

new group expected data<br>
<code>
	{<br>
		"Name" : "Group1", <br>
		"Description" : "The first contribution group",<br>
		"PeriodicAmount" : 10000,<br>
		"Capacity"    : 10,<br>
		"GroupType"    : "private" <br>
	}
</code>
<br>

<h3>------------------ CONTRIBUTE MONEY HAS A GROUP MEMBER--------------------</h3><br>
ENDPOINT: https://esusuapp-api.herokuapp.com/contribute<br>
METHOD  : POST <br>
DESCRIPTION : User must be login first before they can do their contribution <br>
DATA: <br>
<code>
  { <br>
	  "amount" : 10000, <br>
	  "cycle"  : 1, <br>
	  "group"  : "Group name here" <br>
  }
</code>
<br>

<h3>----------------- Search for public group ---------------------------</h3><br>
ENDPOINT : https://esusuapp-api.herokuapp.com/getPublicGroup <br>
METHOD   : GET <br>
Successful data return for public group search <br>
<code>
{ <br>
	"Status": "Complete", <br>
	"Code": 0, <br>
	"msg": "Transaction successful", <br>
	"data": [ <br>
		"Group2", <br>
		"Group3", <br>
		"Group4", <br>
		"Group 5" <br>
	]
}
</code>

The data attribute holds the result of the public group

<br>
<h3>------------------------ JOIN A GROUP -----------------------</h3>
ENDPOINT : https://esusuapp-api.herokuapp.com/joingroup/:GroupName <bR>
METHOD   : GET <br>
DATA : URL Variable Group name <br>
Description : <p>GroupName in the URL is should a group name that the user want to join</p>
<br>

<h3>------------------------ GET A GROUP MEMBERS -----------------------</h3>
ENDPOINT : https://esusuapp-api.herokuapp.com/getGroupMember/:Name <br>
METHOD   : GET <br>
URL Varaible : Name <br>
Description :  <p>This endpoint required that you pass in a url variable Name which stand for the name of the group that the user created </p>

<br>
<h3>---------------------- SEND MAIL NOTIFICATION ------------------</h3> <br>
ENDPOINT : https://esusuapp-api.herokuapp.com/send_groupinvitation <br>
METHOD  : POST <br>
DATA REQUIRED <br>
<code>
 {
	"email"     : "example@yahoo.com",
	"group" : "Group2"
 }
</code>

SUCCESS MSG <br>
<code>
 {
	"Status"     : "Complete",
	"Code"       : 00,
	"msg"        : "Group invitation successfully sent",
	"data"       : "fhhf85885855955050505"
}
</code>
<p>NB : The return data content is to be used to join the group followed by the user username, see the below endpoint on the completetion.  </p>
<br>


<h3>---------------------- JOIN  A GROUP VIA INVITATION LINK ------------------ </h3> <br>
ENDPOINT : https://esusuapp-api.herokuapp.com/joinagroup/:id/:username <br>
METHOD   : GET <br>
DATA REQUIRED <br>
	URL Variable ID and USERNAME



