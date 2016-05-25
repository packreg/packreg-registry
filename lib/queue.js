var kue = require('kue'),
    queue = kue.createQueue(),
    got = require('got'),
    githubAnalyzer = require('./analyzers/github-analyzer.js'),
    helper = require('./helper/validations.js'),
    api = require('./api/rethinkDB.js');


function processPackage(packType, packName, packUrl, repository, callback){
  var job = queue.create('package', {
      type: packType,
      name: packName,
      url: packUrl,
      repository: repository
  }).attempts(2).save(function(err){
      if(err) {
        console.log(err);
      }
      callback(packName);
  });

}

/*
* Process all packages. Determine which analyzer to use by package type
* eg. bower/npm/composer and URL eg. GitHub, Gitlab, etc.
* TODO: Determin which analyzer to use, maybe process all with generic analyzer first..
*/
queue.process('package', function(job, done){

  var packageType = job.data.packType;
  if(ackageType == "bower") {
    return api.createPackage(job.data.name, job.data.url).then(function(model){
      return githubAnalyzer.fetchFromGithub(job.data.name, job.data.repository, done);  
    });
  }

});



// function proccessNpmPackage(package, done) {
//   var npmEndpoint = "https://registry.npmjs.org/",
//       singlePkgUrl = npmEndpoint + package.name;

//   got(singlePkgUrl).then(res => {

//     var pkg = JSON.parse(res.body),
//         pkgName = pkg.name,
//         pkgDesc = pkg.description;

//         // this needs figuring out...
//         if(pkg.repository){
//           var pkgUrl = pkg.repository.url;
//         } else if(pkg.repository && pkg.dist){
//           var pkgUrl = pkg.dist.tarball;
//         } else{
//           var pkgUrl = null;
//         }
//     api.createPackage(pkgName, pkgUrl);

//     }).catch(error => {
//       // throw error
//       console.log(error.res.body);
//     });

//     done();
// }


module.exports = {
  processPackage: processPackage
};