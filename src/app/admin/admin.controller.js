export class AdminController {
  constructor($location, AuthenticationService) {
    "ngInject";

    this.LOGIN_PATH = "/login";

    this.location = $location;
    this.AuthenticationService = AuthenticationService;
    this.title = "Parking lots | Dashboard";
  }

  logout() {
    this.AuthenticationService.clearCredentials();
    this.location.path(this.LOGIN_PATH);
  }
}
