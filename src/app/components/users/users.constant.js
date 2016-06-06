export function UsersConstant() {
  "ngInject";

  let domain = "http://parkinger.net/api/",
    URI = {
      "list": "admin/users",
      "logout": "user/logout/"
    };

  this.getUri = function (scope = "list") {
    return domain.concat(URI[scope]);
  }

}
