var env = require('../config/local.env.js'),
    isGithubUrl = require('is-github-url'),
    bowerAnalyzer = require('./bower-analyzer'),
    npmAnalyzer = require('./npm-analyzer'),
    composerAnalyzer = require('./composer-analyzer')

/**
*
* Depending on the source, package metadata differs too much to process all packages with the
* same analyzer, therefore we categorize and save whatever we can get. General info should be the same.
*
* name | url | description | downloads | ...
*
*/
function classify(packageType, package){

  package.isOnGitHub = false;
  if(isGithubUrl(package.url)){
    package.isOnGitHub = true
  }

  // Run corresponding analyzer
  if(packageType = "npm"){
    npmAnalyzer.analyze(package);
  }

  if(packageType = "bower"){
    bowerAnalyzer.analyze(package);
  }

  if(packageType = "composer"){
    composerAnalyzer.analyze(package);
  }

}

module.exports = {
  classify: classify
};
