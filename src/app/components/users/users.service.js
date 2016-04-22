export class UsersService {
  constructor($resource, moment, UsersConstant) {
    "ngInject";
    this.moment = moment;

    this.getResource = (scope = "list") => $resource(UsersConstant.getUri(scope), null, {
      "get": {"method": "GET"},
      "del": {"method": "DELETE"},
      "update": {"method": "PUT"}
    });
  }

  getUsers() {
    console.log(this.getResource().query());
    return this.getResource().query();
  }

  logout() {
    return this.getResource("logout").del().$promise.then(this.getAvailability()); //@todo check if callback is necessary
  }
}
