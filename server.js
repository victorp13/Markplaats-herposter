/*
    Marktplaats reposter/herposter - automatisch marktplaats advertenties herplaatsen
    
    Copyright (C) 2013  koen-github

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Source located here: https://github.com/koen-github/Markplaats-herposter

*/

//Maakt geen gebruik van de marktplaats API maar werkt volledig op scraping.
var http = require("http");
fs = require('fs')
var jsdom = require("jsdom");
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
                    'j_username': username,
                    'j_password': password,
                    'nl.marktplaats.xsrf.token': token
                });

                console.log(f_cookies);
                console.log(post_data);

                var options = {
                    host: 'www.marktplaats.nl',
                    path: '/account/securityCheck.html',
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
                    var options2 = {
                        host: 'www.marktplaats.nl',
                        path: '/mymp/verkopen/sellerAdsBatched.json',
                        port: 443,
                        method: 'GET',
                        headers: {
                            'Cookie': all_cookies,


                        }

                    };

                    https.get(options2, function (res) {
                        console.log(res.headers);

                        res.on('data', function (chunk) {
                            console.log(chunk.toString());
			
                        });
                        
                        readAd("http://www.marktplaats.nl/a/computers-en-software/laptops-en-notebooks/a1003297423-splinternieuw-acer-17-3-dualcore-4-gb-500-gb-17-3.html?c=9b26ed2a557deff636f4f8b9c5b7a618&previousPage=mympSeller");

                    }).on('error', function (e) {
                        console.log("Got error: " + e.message);
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


function readAd(url)
{
jsdom.env({
  html: url,
  headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24'},
  scripts: ["http://code.jquery.com/jquery.js"],
   done: function (errors, window) {
    console.log("dinges ", window.$("#vip-breadcrumbs-pagination").text().trim());
    console.log("title ", window.$("#title").text().trim());

    console.log("price ", window.$("#vip-ad-price-container").text().replace("Prijs: € ","").trim());
    console.log("shipping ", window.$("#vip-ad-shipping-cost").text().trim());
    console.log("options ", window.$("#vip-ad-attributes").text().replace(/:/g,"").trim());
    console.log("des", window.$("#vip-ad-description").text().trim());

  }
);

}

function writeAd(url) //todo
{


}
