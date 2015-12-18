export class AuthenticationService {
  constructor ($http, $cookies, $timeout) {
    "ngInject";

    this.http = $http;
    // this.Base64 = Base64;
    this.cookies = $cookies;
    this.timeout = $timeout;

  }

  login(username, password) {
    let request = {
      "username": username,
      "password": password
    }
      return this.http.post("http://parking.devone.lt/api/user/login", request);
  }

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
