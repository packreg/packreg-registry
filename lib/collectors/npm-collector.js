var config = require('../config/config.js'),    
    request = require('request'),
    got = require('got'),
    JSONStream = require('JSONStream'),
    es = require('event-stream'),
    queue = require('../queue.js');


var npmJSONpath = "https://skimdb.npmjs.com/registry/_all_docs";

function fetchFromNpm () {
    var packages = require("../data/npm.json");
    
    packages.rows.forEach(function(package, index) {
      var packToPush = {
        name: package.id,
        type: "npm"
      };
      queue.pushPackToQueue(packToPush);
    });
};


module.exports = {
  fetchFromNpm: fetchFromNpm
};
