export class MainController {
  constructor ($location, AuthenticationService) {
    "ngInject";

    this.LOGIN_PATH = "/login";

    this.location = $location;
    this.AuthenticationService = AuthenticationService;
    this.title = "Parking lots";
  }

  logout() {
    this.AuthenticationService.clearCredentials();
    this.location.path(this.LOGIN_PATH);
  }
}
