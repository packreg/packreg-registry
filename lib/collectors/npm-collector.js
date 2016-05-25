var config = require('../config/config.js'),    
    got = require('got'),
    queue = require('../queue.js');


var npmJSONpath = "https://skimdb.npmjs.com/registry/_all_docs";

function fetchFromNpm () {
    var packages = require("../data/npm.json");
    
    packages.rows.forEach(function(package, index) {
      var packToPush = {
        name: package.id,
        type: "npm"
      };

      queue.processPackage(packToPush.type, packToPush.name, "", "", function(res){
        console.log(res);
      });
    });
};


module.exports = {
  fetchFromNpm: fetchFromNpm
};
