export function UsersConstant() {
  "ngInject";

  let domain = "http://localhost:8085/",
    URI = {
      "list": "admin/users",
      "logout": "user/logout/"
    };

  this.getUri = function (scope = "list") {
    return domain.concat(URI[scope]);
  }

}
