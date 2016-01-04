export class LoginController {
  constructor ($location, AuthenticationService) {
    "ngInject";

    this.location = $location;
    this.AuthenticationService = AuthenticationService;
    this.AuthenticationService.clearCredentials();
  }

  login() {
    this.AuthenticationService.login(form.username.value, form.password.value)
      .then( _=> this.onLoginSuccess())
      .catch(response => this.onLoginError(response));
  }

  onLoginSuccess() {
    this.error = null;
    this.location.url("/");
  }

  onLoginError(response) {
    this.error = response.data;
  }
}
