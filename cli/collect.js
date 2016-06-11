var chalk = require("chalk"),
    bowerCollector = require("../lib/collectors/bower-collector.js"),
    npmCollector = require("../lib/collectors/npm-collector.js"),
    composerCollector = require("../lib/collectors/composer-collector.js");


/*
* Start indexing all packages from Bower
*/
function bower() {
  console.log(chalk.green("Starting to collect Bower packages..."));
  bowerCollector.fetchFromBower();
  process.exit(0);
}

/*
* Start indexing all packages from npm
*/
function npm() {
  console.log(chalk.green("Starting to collect npm packages..."));
  npmCollector.fetchFromNpm();
  process.exit(0);
}

/*
* Start indexing all packages from Composer
*/
function composer() {
  console.log(chalk.green("Starting to collect Composer packages..."));
  composerCollector.fetchFromComposer();
  process.exit(0);
}


module.exports = {
  bower: bower,
  npm: npm,
  composer: composer
};
