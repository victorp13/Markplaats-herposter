var jsdom = require("jsdom");
var urls =  require('url');
var path = require("path");

var pric_val = []; //price.typeValue
pric_val['Bieden'] = '4'
pric_val['Nader overeen te komen'] = '2'
pric_val['Op aanvraag'] = '9'
pric_val['Zie omschrijving'] = '8'
pric_val['Ruilen'] = '5'
pric_val['Gratis'] = '6' 


var pric_howto = [];//price.bidding
pric_howto['Vaste prijs'] = 'fixed-price'
pric_howto['Vrij bieden toestaan'] = 'free-bidding'
pric_howto['Bieden vanaf vraagprijs'] = 'bid-higher'



var acceptPayPal = true; //or false field: acceptPaypal

var ship_options = []// field attribute[8]
ship_options['Ophalen']='33'
ship_options['Verzenden']= '34'
ship_options['Ophalen of Verzenden'] ='35'


var shipping_price = '';//shipping.price

function readAd(url)
{
jsdom.env({
  html: url,
  headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24'},
  scripts: ["http://code.jquery.com/jquery.js"],
   done: function (errors, window) {
    console.log("cat1 ", path.basename( urls.parse(window.$("#vip-breadcrumbs-content h2:first a").attr("href").trim().replace(/\n$/,"")).path, ".html").replace("c", "")) ;
    console.log("cat2 ", urls.parse(window.$("#vip-breadcrumbs-content h2:eq(1) a").attr("href").trim().replace(/\n$/,""), true).query.categoryId) ;

    console.log("title ", window.$("#title").text().trim());
    console.log("images", window.$("#vip-carousel").attr("data-images-xl").replace("//i.marktplaats.com", "http://i.marktplaats.com").split("&"))
    console.log("price ", window.$("#vip-ad-price-container").text().replace("Prijs:","").trim());
    var ships = window.$("#vip-ad-shipping-cost").text().trim();
    console.log("attribute[8] = ", ship_options[ships.replace(/ *\([^)]*\) */g,'')]);
    console.log("kosten: ",ships.replace(/(^.*\(|\).*$)/g,'').replace('€',''));
    
    console.log("options ", window.$("#vip-ad-attributes").text().trim().replace(/^\s*\n/gm,"").replace(/:/g,'').replace(/[ ]{2,}/g,'').split('\n'));
    console.log("des", window.$("#vip-ad-description").html().trim());

  }
});
}

readAd("http://www.marktplaats.nl/a/telecommunicatie/pda-s/a1000021255-bluetooth-gps-receiver.html?c=5295d2fa43d5deb6de722080990f22a&previousPage=home");
/*
 * Split bij EIGENSCHAPPEN - vip-ad-attributes
 * 
 *  
 * */
 
 
 

/*==ALTIJD==
 * complete = true
 * 
 *  ==ANDER PRIJSTYPE==
 * price.typeValue
 * Bieden = 4
 * Nader overeen te komen = 2
 * Op aanvraag = 9
 * Zie omschrijving = 8
 * Ruilen = 5
 * Gratis = 6
 * 
 * ==PRIJS==
 * price.option = price
 * price.value = <PRIJS>
 * 
 * ==PRIJS TOT STANDKOMING==
 * price.bidding
 * Vaste prijs = fixed-price
 * Vrij bieden toestaan = free-bidding
 * Bieden vanaf vraagprijs = bid-higher
 * 
 * ==PAYPAL==
 * acceptPaypal = true
 * 
 * ==SHIPPING==
 * attribute[8]
 * Ophalen = 33
 * Verzenden = 34
 * Ophalen of Verzenden = 35
 * 
 * ==LEES PRIJS AF==
 * shipping.price = <SHIPPING_PRICE>
 * 
 * 



*/
