export class AvailabilityService {
  constructor ($resource, AvailabilityConstant) {
    "ngInject";

    this.getResource = (scope = "list") => $resource(AvailabilityConstant.getUri(scope));

  }

  getAvailability() {
    return this.getResource("list").query();
  }

  findCurrentLot() {
    return this.getAvailability().$promise.then( lots => lots.filter( lot => !!lot.current )[0] );
  }
}
