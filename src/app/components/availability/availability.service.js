export class AvailabilityService {
  constructor ($resource, moment, AvailabilityConstant) {
    "ngInject";

    this.moment = moment;
    this.getResource = (scope = "list") => $resource(AvailabilityConstant.getUri(scope), null, { "update": { "method": "PUT" } });

  }

  getAvailability() {
    return this.getResource().query();
  }

  /**
   * Free up lot x day(-s) ahead, by default 1 day
   *
   * @param lot
   * @param days
   * @returns {*|Function}
     */
  freeUpLot(lot, days = 1) {
    lot.freeFrom = this.moment(new Date).format("YYYY-MM-DD");
    lot.freeTill = this.moment(new Date).add(days, 'days').format("YYYY-MM-DD");
    console.log("Sending lot to free up...");
    console.log(lot);
    return this.getResource().update(lot).$promise;
  }

  resetLot(lot) {
    console.log("Deleting lot to bring it back...");
    console.log(lot);
    return this.getResource().delete(lot).$promise;
  }

  findCurrentLot() {
    return this.getAvailability().$promise.then(lots => lots.filter( lot => !!lot.current )[0]);
  }
}
