var chalk = require("chalk"),
    kue = require("kue"),
    queue = require("../lib/queue.js"),
    analyzer = require("../lib/analyzers/general-analyzer.js");

var q = queue.getQueue();

/*
* Remove all completed jobs from the analyzer queue
* Active or delayed jobs will stay untouched by this.
*/
function clearQueue() {
  var amountCompletedJobs = q.completeCount(function(err, amountCompletedJobs) {
    
    if(amountCompletedJobs == 0){
      console.log(chalk.green("There are no active jobs to remove."));
      process.exit(1);
    }

    console.log(chalk.green("Removing "+amountCompletedJobs+" completed jobs from queue."));
    kue.Job.rangeByState('complete', 0, amountCompletedJobs, 'asc', function(err, jobs) {
      jobs.forEach(function( job ) {
        job.remove(function() {
          console.log('Removing job #' + job.id);
        });
      });
    });
    console.log(chalk.green("Done! Queue is clean."));
    process.exit(0);
  });
}

/*
* Show current job statistics inside the analyzer queue
*/
function showStats() {
  q.completeCount(function(err, totalCompleted) {
    q.activeCount(function(err, totalActive) {
      q.failedCount(function(err, totalFailed) {
        q.delayedCount(function(err, totalDelayed) {
          console.log(chalk.green("Active jobs in Queue: "), totalActive);
          console.log(chalk.green("Completed jobs in Queue: "), totalCompleted);
          console.log(chalk.green("Delayed jobs in Queue: "), totalDelayed);
          console.log(chalk.green("Failed jobs in Queue: "), totalFailed);
          process.exit(0);
        });
      });
    });
  });
}


module.exports = {
  clearQueue: clearQueue,
  showStats: showStats
};
