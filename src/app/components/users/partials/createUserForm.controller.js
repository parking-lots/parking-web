export class CreateNewUserController {
  constructor($location, AuthenticationService) {
    "ngInject";

    console.log('labas');

    this.location = $location;
    this.AuthenticationService = AuthenticationService;
    this.title = "Parking lots | Dashboard";
  }
}
