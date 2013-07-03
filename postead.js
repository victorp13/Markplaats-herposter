//url https://www.marktplaats.nl/syi/plaatsAdvertentie.html/save.html
var tools = require('./login.js');
var dingen = require('./readcondies.js');
var querystring = require('querystring');
var https = require("https");
tools.logmein(function(cookies)
{
	console.log(cookies)
	dingen.options("322","339", function(data) {
		console.log(data["200 tot 500 GB"]);
		
		
	
	
	var post_data = querystring.stringify({
		'complete':'true',
		'title':'prachtigelaptop',
		'price.value':'45,00',
		'price.option':'price',
		'description':'koop',
                    'l1': '201',
                    'l2': '216',
                    'nl.marktplaats.xsrf.token': data["token"],

'price.bidding':'free-bidding',
'attribute[190]':'1602',
'attribute[8]':'33',
"contactInformation.sellerName":'Koen',
'contactInformation.postCode':'3711 AH',
'showOnMap' : 'on',
'origin':'HEADER'



                });

              //  console.log(f_cookies);

                
                
                
/*
                var options = {
                    host: 'www.marktplaats.nl',
                    path: '/syi/plaatsAdvertentie.html/save.html',
                    port: 443,
                    method: 'POST',
                    headers: {
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24',
                        'Cookie': cookies+';userid=16090879;',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept-Encoding': 'gzip, deflate',
                        'Content-Length': post_data.length,
                        'Connection': 'keep-alive'
                        

                    }

                };
console.log(options);

                 var post_req = https.get(options, function (res) {
                    console.log(res.headers);
                   // var all_cookies = f_cookies + ";" + res.headers["set-cookie"][1].split(';')[0];
                  //  console.log(all_cookies);
                   

        res.on('data', function (chunk) {
                            console.log(chunk.toString());
               
                        });



                }).on('error', function (e) {
                    console.log("Got error: " + e.message);
                });


                // write parameters to post body  
                post_req.write(post_data);
                post_req.end();//*/
	});
	
});

/* *
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
                    
                    */
