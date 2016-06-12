var env = require('../config/local.env.js'),
    got = require('got'),
    fs = require('fs'),
    exec = require('exec'),
    api = require('../api/rethinkDB.js'),
    collect = require('./collect/github.js'),
    download = require('./download/github.js');

function analyze(package) {

  // api.createPackage(package.name, package.url).then(function(model){
  //   collect.fromGithub(package.name, package.repository);
  // });


  download.fromGithub(package, function(){

    var pathToBowerJSON = "lib/tmp/"+package.name+"/bower.json"

    fs.exists(pathToBowerJSON, function(exists) {
      if (exists) {
        fs.readFile(pathToBowerJSON, 'utf8', function (err, data) {
          if (err) throw err;
          var obj = JSON.parse(data);
          console.log(data);
        });

        var deletePackage = "rm -rf 'lib/tmp/"+package.name+"/";
        exec(deletePackage, function(err, out, code) {
          if (err instanceof Error){
            process.exit(1);
          }
        });

      }
     });

  });

}

module.exports = {
  analyze: analyze
};
