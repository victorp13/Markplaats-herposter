var http = require("http");
fs = require('fs')
var jsdom = require("jsdom");

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
https.get("https://www.marktplaats.nl/account/login.html", function(res) {
var f_cookies = res.headers["set-cookie"][0].split(';')[0] + ";" +res.headers["set-cookie"][1].split(';')[0];
var alles;
console.log(f_cookies);
  res.on('data', function (chunk) {
alles += chunk.toString();

});

res.on('end', function()
{

jsdom.env(
  alles,
  ["http://code.jquery.com/jquery.js"],
  function(errors, window) {
    console.log("contents of a.the-link:", window.$('[name="nl.marktplaats.xsrf.token"]').val());
  });

  });





}).on('error', function(e) {
  console.log("Got error: " + e.message);
});



  
     
  

