
var shared = {
  apiUrl: process.env.API_URL || "http://localhost:3000/api/" 
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
