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
    this.onAvailabilityDataChange();
    AvailabilityService.findCurrentLot().then( lot => { this.currentLot = lot; } );
    this.loading = new Map;
  }

  static getAvailabilityLotsNumbers(lots) {
    return lots.map(lot => lot.number);
  }

  getAvailabilityData() {
    var deferred = this.q.defer();
    if (angular.isArray(this.AvailabilityService)) {
      deferred.resolve(this.AvailabilityService);
    } else {
      this.AvailabilityService.getAvailability().$promise
        .then(availability => {
          let numbers = AvailabilityController.getAvailabilityLotsNumbers(availability);
          this.parkingAvailabilityData = availability.filter((lot,index) => numbers.indexOf(lot.number) === index);
          deferred.resolve(this.parkingAvailabilityData);
        })
        .catch(() => {
          deferred.reject("Could not retrieve parking lots from the server.");
        });
    }

    return deferred.promise;
  }

  onAvailabilityDataChange() {
    this.getAvailabilityData().then(availability => {
      AvailabilityController.getAvailabilityLotsNumbers(availability).map(number => {this.loading.set(number, false)});
    });
  }

  fakeReservePromise() {
    var deferred = this.q.defer();
    setTimeout( () => { deferred.resolve("Resolved...") }, 2000 );

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
    if (!this.isLoading(lot)) {
      this.setLoading(lot);
      this.fakeReservePromise().then( _=> {
        this.resetLoading();
        this.onAvailabilityDataChange();
      });
    } else {
      console.log("STOP! I am loading this..");
    }
  }

  isFreeUpLotAvailable(lot) {
    return !!this.currentLot;
  }

  freeUpLot(lot) {
    this.AvailabilityService.freeUpLot(lot)
      .then(response => {
        this.onAvailabilityDataChange();
        console.log(response);
      })
      .catch(response => {
        console.log(response.data.message);
      });
  }

  isResetLotAvailable() {
    // search this available free lots with this lot as a needle,
    // if found then reset is available
    // because this user has been set his lot as available/free

    console.log("-----------------------------------------------");
    console.log("Searching if reset lot is available...");
    console.log(this.currentLot.number);
    console.log(this.parkingAvailabilityData);

    /*this.parkingAvailabilityData.map(lot => {
      if (lot.number === this.currentLot.number) {
        console.log("Found!");
        return true;
      }
    });*/

    console.log(typeof this.parkingAvailabilityData);

    return false;
  }

  resetLot(lot) {
    this.AvailabilityService.resetLot(lot)
      .then(response => {
        this.onAvailabilityDataChange();
        console.log(response);
      })
      .catch(response => {
        console.log(response.data.message);
      });
  }
}
