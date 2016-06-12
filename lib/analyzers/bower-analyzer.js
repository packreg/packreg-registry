var env = require('../config/local.env.js'),
    got = require('got'),
    fs = require('fs'),
    exec = require('exec'),
    api = require('../api/rethinkDB.js'),
    collect = require('./collect/github.js'),
    download = require('./download/github.js');

function analyze(package) {



  // Create package, hust in case!
  api.createPackage(package.name, package.url).then(function(model){
    // Collect all data available on gitHub, if GH package
    var metadata = collect.fromGithub(package.name, package.repository, function(metadata){
        // Download entire repo, including bower.json and get data from it
        download.fromGithub(package, function(){
          var pathToBowerJSON = "lib/tmp/"+package.name+"/bower.json"

          fs.exists(pathToBowerJSON, function(exists) {
            if (exists) {
                fs.readFile(pathToBowerJSON, 'utf8', function (err, data) {
                  if (err) throw err;

                  // This needs normalization or error checking!!
                  var jsondata = JSON.parse(data);

                  metadata.dependencies = jsondata.dependencies;
                  metadata.keywords = jsondata.keywords;
                  metadata.license = jsondata.license;
                  metadata.jsonDescription = jsondata.jsonDescription;
                  metadata.version = jsondata.version;

                  // console.log(data);
                  console.log(metadata);

                });

                var deletePackage = "rm -rf 'lib/tmp/"+package.name+"'";
                exec(deletePackage, function(err, out, code) {
                  if (err instanceof Error){
                  }
                });


                api.updatePackage(package.name, metadata);

            }
          });
        });
    });
  });




}

module.exports = {
  analyze: analyze
};
