export class LoginController {
  constructor ($location, ResourceService, AuthenticationService) {
    "ngInject";

    this.location = $location;
    this.ResourceService = ResourceService;
    AuthenticationService.clearCredentials();
  }

  login() {
    this.ResourceService.login(form.username.value, form.password.value)
      .then( _=> { this.onLoginSuccess();
        console.log(_);
      })
      .catch(response => this.onLoginError(response));
  }

  onLoginSuccess() {
    this.error = null;
    this.location.url("/");
  }

  onLoginError(response) {
    this.error = response.data;
    if (this.error.message === "User already logged") {
      this.location.url("/");
    }
  }
}
