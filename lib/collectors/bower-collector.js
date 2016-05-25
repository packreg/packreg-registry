var config = require('../config/config.js'),    
    got = require('got'),
    fs = require('fs'),
    queue = require('../queue.js');


var bowerRemoteJSONpath = "https://bower.herokuapp.com/packages",
    bowerLocalJSONpath = "./lib/data/bower.json";

function fetchFromBower () {

    // Ensure latest version of all packages
    // by fetching the latest JSON before queuing
    got(bowerRemoteJSONpath).then(response => {
      fs.writeFile(bowerLocalJSONpath, response.body, function (err) {
        if (err) return console.log(err);
      });
    }).catch(error => {
      console.log(error.response.body);
    });  
    
    var packages = require("../data/bower.json");

    packages.forEach(function(package, index) {
      var urlArray = package.url.split("/"),
          packName = package.name,
          packUrl = package.url,
          repository = urlArray[urlArray.length - 2] +"/"+urlArray[urlArray.length - 1].substring(0, urlArray[urlArray.length - 1].length-4),
          packType = "bower";

      queue.processPackage(packType, packName, packUrl, repository, function(res){
        console.log(res);
      });
    });

};


module.exports = {
  fetchFromBower: fetchFromBower
};
