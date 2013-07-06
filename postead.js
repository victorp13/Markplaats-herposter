//url https://www.marktplaats.nl/syi/plaatsAdvertentie.html/save.html
var tools = require('./login.js');
var dingen = require('./readcondies.js');
var querystring = require('querystring');
var https = require("https");
//console.log(cookies)
dingen.options("820", "340", function(data) {
    //	console.log(data["200 tot 500 GB"]);
    console.log(data["cookies"])

console.log(data);
    var post_data = querystring.stringify({
        'complete': 'true',
        'title': 'Bluetooth GPS Receiver',
        'price.value': '67,42',
        'price.option': 'price',
        'description': 'Met deze bluetooth GPS Satelliet ontvanger breid u uw mobile apparatuur uit. Deze lichtgewicht ontvanger kan maximaal 20 kanalen ontvangen, en heeft een accuratie van minder als 5 meter. De ingebouwde batterij kan tot 9 uur continue werken, en heeft een oplaad tijd van 2 uur. <br /><br /><strong>Eigenschappen:</strong> *Werkt met TomTom, Navicore, en alle grote GPS software pakketten <ul><li>20 parallele satelliet kanalen voor snelle positie bepaling </li><li>Goede navigatie in stads omgevingen </li><li>Ingebouwde oplaadbare Lithium-Polymer batterij voor meer dan 9 uur continu gebruik </li><li>Kan worden geladen met auto lader, terwijl het gebruikt wordt </li><li>Drie kleuren LEDs geven de status aan van de Blutooth/GPS/Power activiteiten van de ontvanger. </li><li>Dimensies: 87(L) x 45(B) x 12(H) mm </li></ul><strong><br />Pakket bevat:</strong> <ul><li>Bluetooth GPS ontvanger </li><li>Auto Lader </li><li>Net Lader </li><li>Handleiding NOTE: Het pakket bevat geen navigatie software, of software drivers. </li></ul>Prijs inclusief BTW, exclusief verzend kosten: € 66.51',
        'l1': '820',
        'l2': '340',
        'nl.marktplaats.xsrf.token': data["token"],
        'price.bidding': 'free-bidding',
        'attribute[1203]' : '30',
        'attribute[8]': '33',
        "contactInformation.sellerName": 'Dinges',
        'contactInformation.postCode': '5051 HN',
        'showOnMap': 'on',
        'images.ids': '0',
        'origin': 'HEADER'



    });


    console.log(post_data);

    var options = {
        host: 'www.marktplaats.nl',
        path: '/syi/plaatsAdvertentie.html/save.html',
        port: 443,
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24',
            'Cookie': data["cookies"],
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Length': post_data.length,
            'Connection': 'keep-alive',
            'Referer': 'https://www.marktplaats.nl/syi/plaatsAdvertentie.html'

        }

    };
    console.log(options);

    var post_req = https.get(options, function(res) {
        console.log(res.headers);
        // var all_cookies = f_cookies + ";" + res.headers["set-cookie"][1].split(';')[0];
        //  console.log(all_cookies);

        res.on('data', function(chunk) {
            //console.log(chunk.toString());
        });



    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });


    // write parameters to post body  
    post_req.write(post_data);
    post_req.end();
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
