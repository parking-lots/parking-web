export function AvailabilityConstant() {
  "ngInject";

  let domain = "http://parking.devone.lt/api/",
    URI = {
      "list": "parking/available",
      "reserve": "parking/reserved"
    };

  this.getUri = function(scope = "list") {
    return domain.concat(URI[scope]);
  }

}
