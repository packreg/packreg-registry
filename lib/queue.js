var chalk = require("chalk"),
    kue = require("kue"),
    queue = kue.createQueue(),
    analyzer = require("./analyzers/general-analyzer.js");

function processPackage(packType, packName, packUrl, repository, callback){
  var job = queue.create("package", {
      type: packType,
      name: packName,
      url: packUrl,
      repository: repository
  }).attempts(2).removeOnComplete(true).save(function(err){
      if(err) {
        console.log(err);
      }
      callback(packName);
  });
}

// All packages go through the general-analyzer first.
queue.process("package", function(job, done){
  analyzer.classify(job.data, done);
});

// Helper for cli
function getQueue(){
  return queue;
}

module.exports = {
  processPackage: processPackage,
  getQueue: getQueue
};