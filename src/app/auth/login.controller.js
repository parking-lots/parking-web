export class LoginController {
  constructor ($location, AuthenticationService) {
    "ngInject";

    this.location = $location;
    this.AuthenticationService = AuthenticationService;
    this.AuthenticationService.clearCredentials();
  }

  login() {
    const SUCCESS_PATH = "/";
    this.dataLoading = true;
    this.AuthenticationService.setCredentials(form.username.value, form.password.value);
    this.location.path(SUCCESS_PATH);
  }
}
