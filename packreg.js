#!/usr/bin/env node
var packreg = require("commander"),
    chalk = require("chalk"),
    queue = require("./cli/queue.js"),
    collect = require("./cli/collect.js");

packreg.version("1.0.0").usage("<command>");


// TODO: add options to run specific collectors (bower/npm/...)
packreg.command("collect")
.description("Starts collecting packages and pushes them into the analyzing queue.")
.action(function() {
  console.log(chalk.green("running collectors..."));
  // run collectors
});


packreg.command("queue")
.description("Output curent stats of the analyzing queue.")
.option("-c, --clear", "Clear the analyzing queue of all remaining jobs.")
.action(function(cmd, options) {
  var options = process.argv.slice(3)[0];
  
  if(options == "--clear" || options == "-c"){
    queue.clearQueue();
  } else {
    queue.showStats();
  }

});


packreg.parse(process.argv);
if(!packreg.args.length) {
    packreg.help();
}