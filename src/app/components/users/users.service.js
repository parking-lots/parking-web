export class UsersService {
  constructor($resource, moment, UsersConstant, ENV_VARS) {
    "ngInject";
    this.moment = moment;

    this.getResource = (scope = "list") => $resource(ENV_VARS.apiUrl.concat(UsersConstant.getUri(scope)), null, {
      "get": {"method": "GET"},
      "del": {"method": "DELETE"},
      "update": {"method": "PUT"}
    });
  }

  getUsers() {
    return this.getResource().query();
  }

  logout() {
    return this.getResource("logout").del().$promise.then(this.getAvailability()); //@todo check if callback is necessary
  }
}
