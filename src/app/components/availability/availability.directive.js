export function AvailabilityDirective() {
  "ngInject";

  return {
    restrict: "E",
    templateUrl: "app/components/availability/availability.html",
    controller: AvailabilityController,
    controllerAs: "vm",
    bindToController: true
  };
}

class AvailabilityController {
  constructor ($q, moment, AvailabilityService) {
    "ngInject";

    this.q = $q;
    this.AvailabilityService = AvailabilityService;
    this.setAvailabilityData();
    AvailabilityService.findCurrentLot().then( lot => { this.currentLot = lot; } );

    this.loading = [];

    //this.relativeDate = moment(this.creationDate).fromNow();
  }

  setAvailabilityData() {
    this.parkingAvailabilityData = this.AvailabilityService.getAvailability();
  }

  fakeReservePromise() {
    var deferred = this.q.defer();
    setTimeout( _ => { deferred.resolve("Resolved...") }, 400 );

    return deferred.promise;

  }

  isLoading(lot) {
    return this.loading.indexOf(lot.number) !== -1;
  }

  setLoading(lot) {
    if ( this.loading.indexOf(lot.number) === -1 ) {
      this.loading.push(lot.number);
    }
  }

  resetLoading() {
    this.loading = [];
  }

  reserve(lot) {
    this.setLoading(lot);
    this.fakeReservePromise().then( _=> {
      this.resetLoading();
      this.setAvailabilityData();
    });
  }

  freeUpLot(lot) {
    this.AvailabilityService.freeUpLot(lot).then( _=> { this.setAvailabilityData(); }
    ).catch( response => { //wtf
      console.log(response.data.message);
    } );
  }
}
