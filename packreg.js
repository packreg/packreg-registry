#!/usr/bin/env node
var packreg = require("commander"),
    chalk = require("chalk"),
    queue = require("./cli/queue.js"),
    collect = require("./cli/collect.js");

packreg.version("1.0.0").usage("<command>");


// TODO: add options to run specific collectors (bower/npm/...)
packreg.command("collect")
.description("Starts collecting packages and pushes them into the analyzing queue.")
.option("-b, --bower", "Start collecting packages from Bower.")
.option("-n, --npm", "Start collecting packages from npm.")
.option("-c, --composer", "Start collecting packages form Composer.")
.action(function() {
  var options = process.argv.slice(3)[0];

  if(options == "--bower" || options == "-b"){
    collect.bower();
  } else if(options == "--npm" || options == "-n"){
    collect.npm();
  } else if (options == "--composer" || options == "-c") {
    collect.composer();
  }
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