var jsdom = require("jsdom");
var urls =  require('url');
var path = require("path");

var http = require("http");
fs = require('fs')
var querystring = require('querystring');


var username;
var password;
var text = fs.readFileSync('logins.ini', 'utf8') //create new file: logins.ini like this: username;password
var dinges = text.split(";");
username = dinges[0];
password = dinges[1];
console.log(username);
console.log(password);



var https = require("https");
var test;
https.get("https://www.marktplaats.nl/account/login.html", function (res) {
    var f_cookies = res.headers["set-cookie"][0].split(';')[0] + ";" + res.headers["set-cookie"][1].split(';')[0];
    var alles;
    console.log(f_cookies);
    res.on('data', function (chunk) {
        alles += chunk.toString();

    });

    res.on('end', function () {
        var token;
        jsdom.env(
            alles, ["http://code.jquery.com/jquery.js"], function (errors, window) {
                token = window.$('[name="nl.marktplaats.xsrf.token"]').val();

                var post_data = querystring.stringify({
                    'l1': '322',
                    'l2': '339',
                    'nl.marktplaats.xsrf.token': token


                });

                console.log(f_cookies);
                console.log(post_data);

                var options = {
                    host: 'www.marktplaats.nl',
                    path: '/syi/plaatsAdvertentie.html',
                    port: 443,
                    method: 'POST',
                    headers: {
                        'Cookie': f_cookies,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': post_data.length

                    }

                };


                 var post_req = https.get(options, function (res) {
                    console.log(res.headers);
                    var all_cookies = f_cookies + ";" + res.headers["set-cookie"][1].split(';')[0];
                    console.log(all_cookies);
                   var samen;

        res.on('data', function (chunk) {
                           samen += chunk.toString();
               
                        });



res.on('end', function (chunk) {
                            
                            jsdom.env(
  samen,
  ["http://code.jquery.com/jquery.js"],
   function (errors, window) {
	   
	   var total = [];
	   
	   window.$('div[class=attribute] ').each(function() {
      var soort = window.$(this).find('label[class=form-label]').text().replace(/^\s*\n/gm, '').trim().replace("(verplicht)","").replace(" ", '').trim();
      var arr = [];
      var arr2 = [];
      
      var end = [];
      var id = window.$(this).find('.form-field').find('input[type=hidden]').attr("name");
      
      total[soort] = id
     window.$(this).find('.form-field').find('li').each(function() {
		  if(!(window.$(this).text().replace("Kies...","") == "")) {
		  		   arr.push(window.$(this).text().replace("Kies...",""));
			   }
		  });
      
    
     var x = 0;
      window.$(this).find('.form-field').find('li').each(function() {
		  
		    if(!(window.$(this).attr("data-val") == "")) {
		  arr2.push(window.$(this).attr("data-val"));
		  
		  total[arr[x]] = window.$(this).attr("data-val")
		  x++;
	  }
		  
		  });
		  
		  
      
      
      
      
      
      
          // form-field
    });
    console.log(total); 
      console.log(total["Conditie"]); 
      console.log(total["Gebruikt"]); 
    

});

                            
                            
               
                        });

                }).on('error', function (e) {
                    console.log("Got error: " + e.message);
                });


                // write parameters to post body  
                post_req.write(post_data);
                post_req.end();

            });

    });


}).on('error', function (e) {
    console.log("Got error: " + e.message);
});








