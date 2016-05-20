var config = require('../config/config.js'),    
    request = require('request'),
    got = require('got'),
    JSONStream = require('JSONStream'),
    es = require('event-stream'),
    queue = require('../queue.js'),
    api = require('../api/rethinkDB.js');


var bowerJSONpath = "https://bower.herokuapp.com/packages";

function fetchFromBower () {
  var packages = require("../data/bower.json");  
  packages.forEach(function(package, index) {
    api.createPackage(package.name, package.url);
  });
};


module.exports = {
  fetchFromBower: fetchFromBower
};
