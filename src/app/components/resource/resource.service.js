export class ResourceService {
  constructor ($resource, $rootScope, EventsConstant) {
    "ngInject";

    this.resource = $resource;
    this.rootScope = $rootScope;
    this.EVENTS = EventsConstant;

    this.domain = "http://parkinger.net/api/";
    this.URI = {
        "list": "parking/available",
        "reserve": "parking/reserved",
        "login": "user/login/",
        "logout": "user/logout/",
        "changePassword": "profile/password",
        "profile": "profile"
      };
  }

  getResource(uriSuffix) {
    if (angular.isUndefined(this.URI[uriSuffix])) {
      throw new Error("You have requested resource URI which is not available.");
    }

    return this.resource(this.domain.concat(this.URI[uriSuffix]));
  }

  login(username, password) {
    let request = {
      "username": username,
      "password": password
    };

    return this.getResource("login").save(request).$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.LOGIN)
    );
  }

  logout() {
    return this.getResource("logout").remove().$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.LOGOUT)
    );
  }

  getUserProfile() {
    return this.getResource("profile").get().$promise;
  }

  changePassword(newPassword) {
    return this.getResource("change/password").update(newPassword).$promise.then(this.getAvailability());

  }
}
