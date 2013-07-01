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
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("<h2>Marktplaats Automatische Reposter</h2>");
  


http.get("https://www.marktplaats.nl/account/login.html", function(req, res) {
  console.log("Got response: " + res.statusCode);
  console.log(res.getHeader('Cookie'););
  // console.log(req.cookies.luckynumber);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
  
  
  
  
  
  response.end();
}).listen(8888);