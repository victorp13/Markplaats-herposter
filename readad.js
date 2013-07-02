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

    console.log("price ", window.$("#vip-ad-price-container").text().replace("Prijs: € ","").trim());
    console.log("shipping ", window.$("#vip-ad-shipping-cost").text().trim());
    console.log("options ", window.$("#vip-ad-attributes").text().replace(/:/g,"").trim());
    console.log("des", window.$("#vip-ad-description").text().trim());

  }
});
}

readAd("http://www.marktplaats.nl/a/caravans-en-kamperen/camper-inkoop/a1002789301-gezocht-campers-voor-inkoop-en-bemiddeling-rdw-erkend.html?c=c3c3a3fd9c3e4c9081be58a8ffe91384&previousPage=lr&casData=EjuiBbJSjW9XHPx2AUOqLMsHlgTZCQa_ib6ZvxTurkVZ8ZQcRB60PUs-FzHwmjCRSATzCcGp5-lS90RwtcAY2fNZf6ZOj7mGMWvwgLdSAN0laHd9oOfONqpDO3Ne1vuI8g3OsglLRt4");
