export class LoginController {
  constructor ($location, AuthenticationService) {
    "ngInject";

    this.location = $location;
    this.AuthenticationService = AuthenticationService;
    this.AuthenticationService.clearCredentials();
  }

  login() {
    console.log("Login");
    this.AuthenticationService.login(form.username.value, form.password.value).then(this.location.url("/"));
  }
}
