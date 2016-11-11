
var shared = {
  apiUrl: process.env.API_URL || "https://test.parkinger.net/api/"
};

var environments = {
  dev: {
    ENV_VARS: shared
  },
  test: {
    ENV_VARS: shared
  },
  prod: {
    ENV_VARS: shared
  }
};

module.exports = environments;
