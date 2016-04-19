export class AuthenticationService {
  constructor($http, ResourceService, $cookies, $timeout) {
    "ngInject";

    this.http = $http;
    this.ResourceService = ResourceService;
    this.cookies = $cookies;
    this.timeout = $timeout;

  }

  login(username, password, remember) {
    let request = {
      "username": username,
      "password": password,
      "remember": remember
    };
    return this.http.post("http://localhost:8085/user/login", request, function (data) {
      console.log("LOGGED IN!");
      console.log(data);
      console.log("-------------------------");
    });
  }

  logout() {

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
    this.http.defaults.headers.common.Authorization = 'Basic';
  }
}
