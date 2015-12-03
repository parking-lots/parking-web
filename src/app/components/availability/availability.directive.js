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
  constructor ($q, AvailabilityService) {
    "ngInject";

    this.q = $q;
    this.AvailabilityService = AvailabilityService;
    this.setAvailabilityData();
    AvailabilityService.findCurrentLot().then( lot => { this.currentLot = lot; } );
    this.loading = new Map;
  }

  setAvailabilityData() {
    this.AvailabilityService.getAvailability().$promise.then(availability => {
      let numbers = availability.map(lot => lot.number);
      this.parkingAvailabilityData = availability.filter((lot,index) => numbers.indexOf(lot.number) === index);
      numbers.map(number => {this.loading.set(number, false)});
    });
  }

  fakeReservePromise() {
    var deferred = this.q.defer();
    setTimeout( () => { deferred.resolve("Resolved...") }, 400 );

    return deferred.promise;
  }

  isLoading(lot) {
    return this.loading.get(lot.number);
  }

  setLoading(lot) {
    this.loading.set(lot.number, true);
  }

  resetLoading() {
    Object.keys(this.loading).map(key => {this.loading[key] = false});
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
