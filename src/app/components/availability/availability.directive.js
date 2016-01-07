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
  constructor ($q, $location, moment, AvailabilityService) {
    "ngInject";

    this.q = $q;
    this.location = $location;
    this.AvailabilityService = AvailabilityService;
    this.setAvailabilityData();

    this.loading = [];
  }

  setAvailabilityData() {
    this.AvailabilityService.getAvailability().$promise
      .then( response => {
        this.parkingAvailabilityData = response;
        console.log(response);
      }).catch( response => {
        if (response.status === 401) {
          this.redirectToLogin();
        }
      });

    this.AvailabilityService.findCurrentLot()
      .then(lot => {
        this.currentLot = lot;
        console.log(lot);
      });

    this.AvailabilityService.getUserProfile().then(profile => this.profile = profile);
  }

  isLoading(lot) {
    return this.loading.indexOf(lot.number) !== -1;
  }

  setLoading(lot) {
    if ( this.loading.indexOf(lot.number) === -1 ) {
      this.loading.push(lot.number);
    }
  }

  shareSpot(lot) {
      this.AvailabilityService.shareSpot(lot);
  }

  takeSpotBack() {
    this.AvailabilityService.takeSpotBack();
  }

  resetLoading() {
    this.loading = [];
  }

  reserve(lot) {
    if (!lot.currentlyUsed) {
      this.setLoading(lot);
      this.AvailabilityService.reserveFreeSpot(lot)
        .then( _=> {
          this.setAvailabilityData();
          this.resetLoading();
        })
        .catch( response => {
          console.log("Failed to reserve free spot.");
          console.log(response);
        });
    }
  }

  freeUpLot(lot) {
    this.AvailabilityService.freeUpLot(lot)
      .then( _=> { this.setAvailabilityData(); delete this.currentLot });
  }

  logout() {
    this.AvailabilityService.logout()
      .then( _=> this.redirectToLogin())
      .catch(response => this.onLogoutError(response));
  }

  redirectToLogin() {
    this.location.path("/login");
  }

  onLogoutError(response) {
    if (response.data.message === "not_logged") {
      this.location.path("/login");
    }
  }
}
