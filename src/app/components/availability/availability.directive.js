export function AvailabilityDirective() {
  "ngInject";

  return {
    restrict: "E",
    templateUrl: "app/components/availability/availability.html",
    /*scope: {
        creationDate: "="
    },*/
    controller: AvailabilityController,
    controllerAs: "vm",
    bindToController: true
  };
}

class AvailabilityController {
  constructor (moment, AvailabilityService) {
    "ngInject";
    this.parkingAvailabilityData = AvailabilityService.getAvailability();
    this.currentLot = AvailabilityService.findCurrentLot();


    //this.relativeDate = moment(this.creationDate).fromNow();
  }
}
