export class AvailabilityService {
  constructor ($resource, moment, AvailabilityConstant) {
    "ngInject";
    this.moment = moment;

    this.getResource = (scope = "list") => $resource(AvailabilityConstant.getUri(scope), null, {
      "get": {"method": "GET"},
      "del": {"method": "DELETE"},
      "update": {"method": "PUT"}
    });
  }
  getAvailability() {
    return this.getResource().query();
  }

  freeUpLot(lot, days = 1) {
    lot.freeFrom = this.moment(new Date).format("YYYY-MM-DD");
    lot.freeTill = this.moment(new Date).add(days, 'days').format("YYYY-MM-DD");
    return this.getResource("reserve").del(lot).$promise;
  }

  shareSpot(lot) {
    return this.getResource().update(lot).$promise.then(this.getAvailability())
  }

  takeSpotBack() {
    return this.getResource().del().$promise
      .then(response => {
        this.getAvailability();
        console.log(this.getAvailability());
        console.log(response);
      });
  }

  reserveFreeSpot(lot) {
    return this.getResource("reserve").update(lot).$promise.then(this.getAvailability());
  }

  getUserProfile() {
    return this.getResource("profile").get().$promise;
  }

  reset() {

  }

  findCurrentLot() {
    return this.getAvailability().$promise.then( lots => lots.filter( lot => !!lot.currentlyUsed )[0] );
  }

  logout() {
    return this.getResource("logout").del().$promise.then(this.getAvailability()); //@todo check if callback is necessary
  }
}
