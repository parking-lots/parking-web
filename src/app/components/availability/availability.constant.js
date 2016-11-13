export function AvailabilityConstant() {
  "ngInject";

    let URI = {
      "list": "parking/available",
      "updateList": "parking/availability",
      "reserve": "parking/{pathParam}/reservation",
      "logout": "user/login",
      "change/password": "user/profile",
      "profile": "user/profile"
    };

  this.getUri = function (scope = "list", parameter = "") {
    return URI[scope].replace("{pathParam}", parameter);
  }

}
