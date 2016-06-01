var config = require('../config/config.js'),
    got = require('got'),
    queue = require('../queue.js');

// See also: https://packagist.org/apidoc
var composerJSONpath = "https://packagist.org/packages/list.json",
    composerLocalJSONpath = "./lib/data/composer.json";

function fetchFromComposer () {

  got(composerJSONpath).then(response => {
      fs.writeFile(composerLocalJSONpath, response.body, function (err) {
        if (err) return console.log(err);
      });
    }).catch(error => {
      console.log(error.response.body);
    });  

  var packages = require("../data/composer.json");

  packages.packageNames.forEach(function(package, index) {
    var packName = package.split("/")[1],
        packRepo = package,
        packType = "composer";

    queue.processPackage(packType, packName, "", packRepo, function(res){
      console.log(res);
    });
    
  });

};


module.exports = {
  fetchFromComposer: fetchFromComposer
};
