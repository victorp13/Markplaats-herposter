var jsdom = require("jsdom");
var urls = require('url');
var path = require("path");

var http = require("http");
fs = require('fs')
var querystring = require('querystring');

var https = require("https");
var test;
var tools = require('./login.js');

exports.options = function condition(cat1,cat2, callback)
{
tools.logmein(function(cookies, token)
{
            var post_data = querystring.stringify({
                'l1': cat1,
                'l2': cat2,
                'nl.marktplaats.xsrf.token': token


            });
            console.log(cookies);

            var options = {
                host: 'www.marktplaats.nl',
                path: '/syi/plaatsAdvertentie.html',
                port: 443,
                method: 'POST',
                headers: {
                    'Cookie': cookies,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': post_data.length

                }

            };


            var post_req = https.get(options, function(res) {

                var all_cookies = res.headers["set-cookie"][1].split(';')[0];
                console.log(all_cookies);
                var samen;

                res.on('data', function(chunk) {
                    samen += chunk.toString();

                });



                res.on('end', function(chunk) {
var token2;
                    jsdom.env(
                    samen, ["http://code.jquery.com/jquery.js"], function(errors, window) {
						token2 = window.$('[name="nl.marktplaats.xsrf.token"]').val();
						console.log(token2);
                        var total = [];

                        window.$('div[class=attribute] ').each(function() {
                            var soort = window.$(this).find('label[class=form-label]').text().replace(/^\s*\n/gm, '').trim().replace("(verplicht)", "").replace(" ", '').trim();
                            var arr = [];
                            var arr2 = [];

                            var end = [];
                            var id = window.$(this).find('.form-field').find('input[type=hidden]').attr("name");

                            total[soort] = id
                            window.$(this).find('.form-field').find('li').each(function() {
                                if (!(window.$(this).text().replace("Kies...", "") == "")) {
                                    arr.push(window.$(this).text().replace("Kies...", ""));
                                }
                            });


                            var x = 0;
                            window.$(this).find('.form-field').find('li').each(function() {

                                if (!(window.$(this).attr("data-val") == "")) {
                                    arr2.push(window.$(this).attr("data-val"));

                                    total[arr[x]] = window.$(this).attr("data-val")
                                    x++;
                                }

                            });








                            // form-field
                        });
                        if (!(window.$("div[class=multi-select-attribute-title]").text().replace("\n", "").trim() == "")) {
                            total[window.$("div[class=multi-select-attribute-title]").text().replace("\n", "").trim()] = window.$("div[class=ms-opt] input:eq(0)").attr("name");

                            window.$("div[class=ms-opt] ").each(function() {
                                total[window.$(this).find("label").text().trim()] = window.$(this).find("input").attr("value").trim()


                            });
                        }
						total["token"] = token2;
						total["cookies"] = cookies;
                        callback(total);
                        

                    });




                });

            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });


            // write parameters to post body  
            post_req.write(post_data);
            post_req.end();

});
}


