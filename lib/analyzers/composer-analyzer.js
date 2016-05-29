var env = require('../config/local.env.js'),
    got = require('got'),
    api = require('../api/rethinkDB.js'),
    githubRunner = require('./runner/github.js');

function analyze(package) {
  
  if(package.isOnGitHub) {
    // githubRunner.fetchFromGithub(packName, repository);
  }

}


module.exports = {
  analyze: analyze
};
