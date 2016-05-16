var config = require('../config/config.js'),    
    request = require('request'),
    got = require('got'),
    JSONStream = require('JSONStream'),
    es = require('event-stream'),
    queue = require('../queue.js');


var npmEndpointNames = "https://skimdb.npmjs.com/registry/_all_docs";

function fetchFromNpm () {
  got.stream(npmEndpointNames).pipe(JSONStream.parse('rows.*')).pipe(es.mapSync(function (data) {        

        var packToPush = {
          name: data.id,
          type: "npm"
        }

        queue.pushPackToQueue(packToPush, function(res){
          console.log("Package " + data.id + " pushed to queue. Job ID is: "+res);
        });
  }));
    
};


module.exports = {
  fetchFromNpm: fetchFromNpm
};
