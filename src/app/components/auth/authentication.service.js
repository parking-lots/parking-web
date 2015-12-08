export class AuthenticationService {
  constructor ($http, $cookies, $timeout) {
    "ngInject";

    this.http = $http;
    // this.Base64 = Base64;
    this.cookies = $cookies;
    this.timeout = $timeout;

  }

  // login(username, password, callback) {
  //   /* Dummy authentication for testing, uses $timeout to simulate api call
  //    ----------------------------------------------*/
  //   this.timeout(function() {
  //     let response = { success: username === 'test' && password === 'test' };
  //     if(!response.success) {
  //       response.message = 'Username or password is incorrect';
  //     }
  //     callback(response);
  //   }, 1000);
  //
  //
  //    ----------------------------------------------*/
  //   $http.post('http://parking.devone.lt/api/authenticate', { username: username, password: password })
  //       .success(function (response) {
  //         callback(response);
  //       });
  // }

  setCredentials(username, password) {
    let authdata = window.btoa(username + ":" + password);
    this.http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    this.saveCredentials(username, password);
  }

  saveCredentials(username, password) {
    let authdata = window.btoa(username + ":" + password);
    this.cookies.put('globals', authdata);
  }

  clearCredentials() {
    this.cookies.remove('globals');
    this.http.defaults.headers.common.Authorization = 'Basic ';
  }
}
