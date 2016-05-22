var config = require('../config/config.js'),    
    request = require('request'),
    got = require('got'),
    JSONStream = require('JSONStream'),
    es = require('event-stream'),
    queue = require('../queue.js'),
    api = require('../api/rethinkDB.js'),
    fs = require('fs'),
    download = require('download'),
    analyzer = require("../analyzers/github-analyzer");


var bowerJSONpath = "https://bower.herokuapp.com/packages";

function fetchFromBower () {
  
    var packages = require("../data/bower.json");

    packages.forEach(function(package, index) {
      
      var urlArray = package.url.split("/"),
          packName = package.name,
          packUrl = package.url,
          repository = urlArray[urlArray.length - 2] +"/"+urlArray[urlArray.length - 1].substring(0, urlArray[urlArray.length - 1].length-4);
      
      queue.processBowerPack(packName, packUrl, repository, function(res){
        console.log(res);
      });
    });

};


module.exports = {
  fetchFromBower: fetchFromBower
};
