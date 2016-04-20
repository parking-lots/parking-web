export function AvailabilityConstant() {
  "ngInject";

  let domain = "http://localhost:8085/",
    URI = {
      "list": "parking/available",
      "reserve": "parking/reserved",
      "logout": "user/logout/",
      "change/password": "profile/password",
      "profile": "/profile"
    };

  this.getUri = function (scope = "list") {
    return domain.concat(URI[scope]);
  }

}
