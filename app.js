//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://admin-kalyan:kalyanmoy.borah1@cluster0-jasiy.mongodb.net/blooddonationDB",{useNewUrlParser:true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
  BloodGroup: String,
  PhoneNumber: String,
  AdditionalPhoneNumber: String,
  Address: String,
  State: String,
  District: String,
  Email: String,
  Password: String
});

const User = mongoose.model("User", userSchema);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render("index");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/register", function(req, res){
const  Name = req.body.name;
const Age = req.body.age;
const BloodGroup = req.body.bloodGroup;
const PhoneNumber = req.body.phoneNo;
const AdditionalPhoneNumber = req.body.addPhoneNo;
const Address = req.body.address;
const State = req.body.state;
const District = req.body.district;
const Email = req.body.email;
const Password = req.body.password;

const user = new User({
  Name: Name,
  Age: Age,
  BloodGroup: BloodGroup,
  PhoneNumber: PhoneNumber,
  AdditionalPhoneNumber: AdditionalPhoneNumber,
  Address: Address,
  State: State,
  District: District,
  Email: Email,
  Password: Password,
});

user.save(function(err){
  if(!err){
    res.redirect("/login");
  }
});
});

app.post("/login", function(req,res){

  const username = req.body.username;
  const password = req.body.password;

User.findOne({Name: username}, function(err, foundUser){
  if(err){
    console.log(err);
  }else{
    if(foundUser){
      if(foundUser.Password === password){
        User.find(function(err, users){
          if(err){
            console.log(err);
          }else{
            res.render("database", {users: users});
          }
        });

      }
    }
  }

});




});














let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server has started successfully.");
});
