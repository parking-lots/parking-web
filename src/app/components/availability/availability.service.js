export class AvailabilityService {
  constructor ($resource) {
    "ngInject";

    this.parkingAvailabilityData = [
      {
        "number": "107",
        "owner": "Justin Cabbage",
        "floor": "-1",
        "current": true
      },
      {
        "number": "112",
        "owner": "Leonardo da Vinci",
        "floor": "-1",
        "current": false
      },
      {
        "number": "142",
        "owner": "Dalai Lama",
        "floor": "-2",
        "current": false
      },
      {
        "number": "151",
        "owner": "Cock Cocker",
        "floor": "-2",
        "current": false
      }
    ];
  }

  getAvailability($resource) {
    return this.parkingAvailabilityData;
  }

  findCurrentLot() {
    return this.getAvailability().filter( lot => !!lot.current );
  }
}
