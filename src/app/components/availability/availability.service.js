export class AvailabilityService {
  constructor ($resource, moment) {
    "ngInject";
    this.moment = moment;

    this.getResource = (scope = "list") => $resource(AvailabilityService.getUri(scope), null, {"update": { "method": "PUT" }, "freeup": {"method":"DELETE"}});
  }

  getAvailability() {
    return this.getResource().query();
  }

  freeUpLot(lot, days = 1) {
    lot.freeFrom = this.moment(new Date).format("YYYY-MM-DD");
    lot.freeTill = this.moment(new Date).add(days, 'days').format("YYYY-MM-DD");
    console.log("Updating");
    return this.getResource("reserve").freeup(lot).$promise;
  }

  shareSpot(lot) {
    return this.getResource().update(lot).$promise.then(function() {
      document.location.reload(false);
    })
  }

  takeSpotBack() {
    return this.getResource().freeup().$promise.then(function() {
      document.location.reload(false);
    })
  }

  reserveFreeSpot(lot) {
      return this.getResource("reserve").update(lot).$promise.then(function(){
        document.location.reload(false);
      })
  }

  findCurrentLot() {
    return this.getAvailability().$promise.then( lots => lots.filter( lot => !!lot.currentlyUsed )[0] );
  }

  static getUri(scope = "list") {
    let domain = "http://parking.devone.lt/api/",
      URI = {
        "list": "parking/available",
        "reserve": "parking/reserved"
      };
    return domain.concat(URI[scope]);
  }
}
