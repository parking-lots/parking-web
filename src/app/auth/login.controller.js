export class LoginController {
  constructor ($location, AuthenticationService) {
    "ngInject";

    this.location = $location;
    this.AuthenticationService = AuthenticationService;
    this.AuthenticationService.clearCredentials();
  }

  login() {
    let SUCCESS_PATH = "/";

    this.dataLoading = true;
    this.AuthenticationService.login(form.username.value, form.password.value, response => {
      if(response.success) {
        this.AuthenticationService.setCredentials(form.username.value, form.password.value);
        this.location.path(SUCCESS_PATH);
      } else {
        this.error = response.message;
        this.dataLoading = false;
      }
    });
  }
}
