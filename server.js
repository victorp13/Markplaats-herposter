var http = require("http");
fs = require('fs')
var username;
var password;
fs.readFile('logins.ini', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  
  var dinges = data.split(";");
  username = dinges[0];
  password = dinges[1];
});
console.log(username);
console.log(password);



var https = require("https");
var test;
var nieuw = https.get("https://www.marktplaats.nl/account/login.html", function(res, body, callback) {
callback(res.headers["set-cookie"][0].split(';')[0] + ";" +res.headers["set-cookie"][1].split(';')[0]);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

console.log(nieuw);

  
     
  

