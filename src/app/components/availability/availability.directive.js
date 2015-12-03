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
  constructor (moment, AvailabilityService) {
    "ngInject";

    this.parkingAvailabilityData = AvailabilityService.getAvailability();
    AvailabilityService.findCurrentLot().then( lot => { this.currentLot = lot; } );

    //this.relativeDate = moment(this.creationDate).fromNow();
  }

  reserve(lot) {

    alert(`You have just reserved lot ${lot.number} in ${lot.floor} floor.`);
    return true;
  }
}
