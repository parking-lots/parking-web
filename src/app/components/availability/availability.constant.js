export function AvailabilityConstant() {
  "ngInject";

  let domain = "http://parking.devone.lt/api/",
    URI = {
      "list": "parking/available",
      "reserve": "parking/reserved",
      "logout": "user/logout/",
      "profile": "user/profile"
    };

  this.getUri = function(scope = "list") {
    return domain.concat(URI[scope]);
  }

}
