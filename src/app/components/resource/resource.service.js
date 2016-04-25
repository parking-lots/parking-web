export class ResourceService {
  constructor($resource, $rootScope, EventsConstant) {
    "ngInject";

    this.resource = $resource;
    this.rootScope = $rootScope;
    this.EVENTS = EventsConstant;

    this.domain = "http://localhost:8085/";
    this.URI = {
      "list": "parking/available",
      "reserve": "parking/reserved",
      "login": "user/login/",
      "logout": "user/logout/",
      "changePassword": "profile/password",
      "profile": "profile",
      "createUser": "admin/user/create",
      "removeParking": "/parking/remove"
    };
  }

  getResource(uriSuffix) {
    if (angular.isUndefined(this.URI[uriSuffix])) {
      throw new Error("You have requested resource URI which is not available.");
    }

    return this.resource(this.domain.concat(this.URI[uriSuffix]));
  }

  takeSingleSpotBack(number, freeFrom, freeTill) {
    let request = {
      number: number,
      freeTill: freeFrom,
      freeFrom: freeTill
    };

    return this.getResource("removeParking").save(request).$promise;
  }

  login(username, password, remember) {
    let request = {
      "username": username,
      "password": password,
      "remember": remember
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

  loginWithRememberMe() {
    return this.getResource("login").get().$promise
      .then(
        _ => this.rootScope.$broadcast(this.EVENTS.LOGIN)
      );
  }


  createUser(fullname, username, password, number, floor) {
    let request;
    if (number != null) {
      request = {
        account: {
          "fullName": fullname,
          "username": username,
          "password": password
        }, parking: {
          "number": number,
          "floor": floor
        }
      };
    }
    else {
      request = {
        account: {
          "fullName": fullname,
          "username": username,
          "password": password
        }
      };
    }


    return this.getResource("createUser").save(request).$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.CREATEUSER)
    );
  }


}
