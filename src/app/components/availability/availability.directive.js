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
    AvailabilityService.findCurrentLot().then( lot => { this.currentLot = lot; } );

    this.loading = [];
  }

  setAvailabilityData() {
    this.parkingAvailabilityData = this.AvailabilityService.getAvailability();
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
      this.AvailabilityService.shareSpot(this.lot);
  }

  takeSpotBack() {
    this.AvailabilityService.takeSpotBack();
  }

  resetLoading() {
    this.loading = [];
  }

  reserve(lot) {
    this.setLoading(lot);
    this.AvailabilityService.reserveFreeSpot(lot);
  }

  freeUpLot(lot) {
    this.AvailabilityService.freeUpLot(lot).then( _ => { this.setAvailabilityData(); delete this.currentLot });
  }

  logout() {
    this.AvailabilityService.logout()
      .then( _=> this.onLogoutSuccess())
      .catch(response => this.onLogoutError(response));
  }

  onLogoutSuccess() {
    this.location.path("/login");
  }

  onLogoutError(response) {
    if (response.data.message === "not_logged") {
      this.location.path("/login");
    }
  }
}
