export function AvailabilityConstant() {
  "ngInject";

  let domain = "https://test.parkinger.net/api/",
    URI = {
      "list": "parking/available",
      "updateList": "parking/availability",
      "reserve": "parking/{pathParam}/reservation",
      "logout": "user/login",
      "change/password": "user/profile",
      "profile": "user/profile"
    };

  this.getUri = function (scope = "list", parameter = "") {
    return domain.concat(URI[scope].replace("{pathParam}", parameter));
  }

}
