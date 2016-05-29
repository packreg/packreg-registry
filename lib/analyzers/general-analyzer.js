var env = require('../config/local.env.js'),
    isGithubUrl = require('is-github-url'),
    bowerAnalyzer = require('./bower-analyzer.js'),
    npmAnalyzer = require('./npm-analyzer.js'),
    composerAnalyzer = require('./composer-analyzer.js')

/**
*
* Depending on the source, package metadata differs too much to process all packages with the
* same analyzer, therefore we categorize and save whatever we can get. General info should be the same.
* name | url | description | downloads | ...
* 
* @param {package} - type, name, url, repository
*
*/
function classify(package, done){
  
  package.isOnGitHub = false;
  if(package.url && isGithubUrl(package.url)){
    package.isOnGitHub = true
  }

  // Run corresponding analyzer
  if(package.type = "npm"){
    npmAnalyzer.analyze(package);
  }

  if(package.type = "bower"){
    bowerAnalyzer.analyze(package);
  }

  if(package.type = "composer"){
    composerAnalyzer.analyze(package);
  }

  done();
}

module.exports = {
  classify: classify
};
