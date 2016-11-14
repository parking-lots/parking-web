export function UsersConstant() {
  "ngInject";

  let domain = "https://test.parkinger.net/api/",
    URI = {
      "list": "admin/users",
      "logout": "user/logout/"
    };

  this.getUri = function (scope = "list") {
      return URI[scope];
  }

}
