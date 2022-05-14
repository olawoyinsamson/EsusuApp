var express = require("express");
var path    = require("path");
var mongoose = require("mongoose");
var controller = require("./routes/controller");
var bodyParser = require("body-parser");
var session = require("express-session");

// Connect to mongoes
var MONGO_URL = "mongodb://localhost:27017/esusuapp";
mongoose.connect(MONGO_URL);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log("connected to mongodb");
})

var app = express();
app.use(express.json())

// Body Parser Milddle ware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//SESSION MIDDLE WARE
app.use(session({
    secret : 'keybaord cat',
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge: 60 * 60 * 1000 }
  }))


var port= 3000;

app.use("/",controller);

app.listen(port, function(){
    console.log("Server started @"+ port);
})