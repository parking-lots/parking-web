export function AvailabilityConstant() {
  "ngInject";

  let domain = "http://devone.lt:8087/",
      URI = {
        "list": "parking/available",
        "reserve": "parking/reserved"
      };

  this.getUri = function(scope = "list") {
    return domain.concat(URI[scope]);
  }

}
