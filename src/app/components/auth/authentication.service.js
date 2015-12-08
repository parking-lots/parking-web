export class AuthenticationService {
  constructor (Base64, $http, $cookieStore, $rootScope, $timeout) {
    "ngInject";

    this.http = $http;
    this.rootScope = $rootScope;
    this.Base64 = Base64;
    this.cookieStore = $cookieStore;
    this.timeout = $timeout;

  }

  login(username, password, callback) {
    /* Dummy authentication for testing, uses $timeout to simulate api call
     ----------------------------------------------*/
    this.timeout(function() {
      var response = { success: username === 'test' && password === 'test' };
      if(!response.success) {
        response.message = 'Username or password is incorrect';
      }
      callback(response);
    }, 1000);


    // change http to ng resource
    /* Use this for real authentication
     ----------------------------------------------*/
    //$http.post('/api/authenticate', { username: username, password: password })
    //    .success(function (response) {
    //        callback(response);
    //    });
  }

  setCredentials(username, password) {
    var authdata = this.Base64.encode(username + ":" + password);

    this.rootScope.globals = {
      currentUser: {
        username: username,
        authdata: authdata
      }
    };

    this.http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    this.cookieStore.put('globals', this.rootScope.globals);
  }

  clearCredentials() {
    this.rootScope.globals = {};
    this.cookieStore.remove('globals');
    this.http.defaults.headers.common.Authorization = 'Basic ';
  }
}
