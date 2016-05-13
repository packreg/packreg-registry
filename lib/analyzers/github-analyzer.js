var env = require('../config/local.env.js'),
    tokenDealer = require('token-dealer'),
    got = require('got'),
    tokens = env.githubTokens;

function fetchFromGithub() {

  var repository = "bower/bower";

  tokenDealer(tokens, (token, exhaust) => {
      const handleRateLimit = (response, err) => {
          if (response.headers['x-ratelimit-remaining'] === '0') {
              const isRateLimitError = err && err.statusCode === 403 && /rate limit/i.test(response.body.message);
              exhaust(Number(response.headers['x-ratelimit-reset']) * 1000, isRateLimitError);
          }
      };

      return got('https://api.github.com/repos/'+repository, {
          json: true,
          headers: { Authorization: `token ${token}` },
      })
      .then((response) => {
          handleRateLimit(response);
          return response;
      }, (err) => {
          err.response && handleRateLimit(err.response, err);
          throw err;
      });
  })
  .then((response) => {
      console.log(response);
  }, (err) => {
      // If all tokens are exhausted, err.code will be 'EALLTOKENSEXHAUSTED'
      console.log(err);
  });

}

module.exports = {
  fetchFromGithub: fetchFromGithub
};
