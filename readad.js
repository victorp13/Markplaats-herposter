var jsdom = require("jsdom");
var urls =  require('url');
var path = require("path");
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
    console.log("images", window.$("#vip-carousel").attr("data-images-xl").split("&"))
    console.log("price ", window.$("#vip-ad-price-container").text().replace("Prijs: € ","").trim());
    console.log("shipping ", window.$("#vip-ad-shipping-cost").text().trim());
    console.log("options ", window.$("#vip-ad-attributes").text().replace(/:/g,"").trim());
    console.log("des", window.$("#vip-ad-description").innerHTML.trim());

  }
});
}

readAd("http://www.marktplaats.nl/a/auto-s/chevrolet/m693715695-chevrolet-captiva-suv-7-pers-automaat.html?c=5295d2fa43d5deb6de722080990f22a&previousPage=home");
