var env = require('../config/local.env.js'),
    got = require('got'),
    api = require('../api/rethinkDB.js'),
    githubRunner = require('./runner/github.js');

function analyze(package) {
  
//   return api.createPackage(package.data.name, package.data.url).then(function(model){
//     return githubRunner.fetchFromGithub(package.data.name, package.data.repository, done);  
//   });

}

module.exports = {
  analyze: analyze
};
