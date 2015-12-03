export class AvailabilityService {
  constructor ($resource, moment, AvailabilityConstant) {
    "ngInject";

    this.moment = moment;
    this.getResource = (scope = "list") => $resource(AvailabilityConstant.getUri(scope), null, { "update": { "method": "PUT" } });

  }

  getAvailability() {
    return this.getResource().query();
  }

  freeUpLot(lot, days = 1) {
    lot.freeFrom = this.moment(new Date).format("YYYY-MM-DD");
    lot.freeTill = this.moment(new Date).add(days, 'days').format("YYYY-MM-DD");
    return this.getResource().update(lot).$promise;
  }

  findCurrentLot() {
    return this.getAvailability().$promise.then( lots => lots.filter( lot => !!lot.current )[0] );
  }
}
