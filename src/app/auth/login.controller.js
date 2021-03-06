export class LoginController {
  constructor($location, ResourceService, AuthenticationService) {
    "ngInject";

    this.location = $location;
    this.ResourceService = ResourceService;
    AuthenticationService.clearCredentials();

    this.loginRememberMe();
  }

  login(formdata) {
    this.ResourceService.login(formdata.username, formdata.password, formdata.remember)
      .then(_=> {
        this.onLoginSuccess();
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
    } else {
      this.location.url("/login");
    }
  }

  loginRememberMe() {
    this.ResourceService.loginWithRememberMe()
      .then(_=> {
        this.onLoginSuccess();
      })
      .catch(response => {
        this.onLoginError();
      });
  }
}
