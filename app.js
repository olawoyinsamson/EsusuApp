var express = require("express");
var path    = require("path");

var app = express();
var port= 3000;

app.get("/",function(req,res){
    res.send("Working");
})

app.listen(port, function(){
    console.log("Server started @"+ port);
})