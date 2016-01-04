export class AvailabilityService {
  constructor ($resource, moment, AvailabilityConstant) {
    "ngInject";
    this.moment = moment;

    this.getResource = (scope = "list") => $resource(AvailabilityConstant.getUri(scope), null, {
      "update": {"method": "PUT"},
      "freeup": {"method": "DELETE"},
      "logout": {"method": "DELETE"}
    });
  }
  getAvailability() {
    return this.getResource().query();
  }

  freeUpLot(lot, days = 1) {
    lot.freeFrom = this.moment(new Date).format("YYYY-MM-DD");
    lot.freeTill = this.moment(new Date).add(days, 'days').format("YYYY-MM-DD");
    return this.getResource("reserve").freeup(lot).$promise;
  }

  shareSpot(lot) {
    return this.getResource().update(lot).$promise.then(this.getAvailability())
  }

  takeSpotBack() {
    return this.getResource().freeup().$promise.then(this.getAvailability())
  }

  reserveFreeSpot(lot) {
    return this.getResource("reserve").update(lot).$promise.then(this.getAvailability())
  }

  reset() {

  }

  findCurrentLot() {
    return this.getAvailability().$promise.then( lots => lots.filter( lot => !!lot.currentlyUsed )[0] );
  }

  logout() {
    return this.getResource("logout").logout().$promise.then(this.getAvailability()); //@todo check if callback is necessary
  }
}
