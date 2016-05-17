var kue = require('kue'),
    queue = kue.createQueue(),
    got = require('got'),
    githubAnalyzer = require('./analyzers/github-analyzer.js'),
    helper = require('./helper/validations.js'),
    api = require('./api/rethinkDB.js');



function pushPackToQueue(package, callback){
  var job = queue.create('package', {
      title: package.name,
      package: package
  }).attempts(2).save(function(err){
      if(err) {
        console.log(err);
      }
      callback(job.id);
  });
}


// Automatically continue processing jobs
// This watcher runs infinitely
queue.process('package', function(job, done){
  proccessNpmPackage(job.data.package, done);
});


function proccessNpmPackage(package, done) {

  var npmEndpoint = "https://registry.npmjs.org/",
      singlePkgUrl = npmEndpoint + package.name;

  // package.type
  got(singlePkgUrl).then(res => {

    var pkg = JSON.parse(res.body),
        pkgName = pkg.name,
        pkgDesc = pkg.description;

        // this needs figuring out...
        if(pkg.repository){
          var pkgUrl = pkg.repository.url;
        } else if(pkg.repository && pkg.dist){
          var pkgUrl = pkg.dist.tarball;
        } else{
          var pkgUrl = null;
        }

    api.createPackage(pkgName, pkgUrl);

    }).catch(error => {
      // throw error
      console.log(error.res.body);
    });

    done();
  }


module.exports = {
  pushPackToQueue: pushPackToQueue,
  proccessNpmPackage: proccessNpmPackage
};