export class ResourceService {
  constructor($resource, $rootScope, EventsConstant, ENV_VARS) {
    "ngInject";

    this.resource = $resource;
    this.rootScope = $rootScope;
    this.EVENTS = EventsConstant;

    this.domain = ENV_VARS.apiUrl;
    this.URI = {
      "list": "parking/available",
      "reserve": "parking/reserved",
      "login": "user/login",
      "logout": "user/login",
      "changePassword": "profile/password",
      "profile": "user/profile",
      "createUser": "admin/users",
      "removeParking": "/parking/availability",
      "editUser": "admin/user/edit"
    };
  }

  getResource(uriSuffix, request) {
    if (angular.isUndefined(this.URI[uriSuffix])) {
      throw new Error("You have requested resource URI which is not available.");
    }

    return this.resource(
      this.domain.concat(this.URI[uriSuffix]),
      null,
      {
          "update": {
              "method": "POST",
              "data": request,
              "headers": {
                  "Content-Type": "application/json;charset=utf-8"
              }
          },
          "create": {
              "method": "PUT",
              "data": request,
              "headers": {
                  "Content-Type": "application/json;charset=utf-8"
              }
          },
          "del": {
              "method": "DELETE",
              "data": request,
              "headers": {
                  "Content-Type": "application/json;charset=utf-8"
              }
          }
      }
    );
  }

  takeSingleSpotBack(number, freeFrom, freeTill) {
    let request = {
      from: freeFrom,
      till: freeTill
    };

    return this.getResource("removeParking", request).del().$promise;
  }

  loginWithRememberMe() {
    return this.getResource("login").get().$promise
      .then(
        _ => this.rootScope.$broadcast(this.EVENTS.LOGIN)
      );
  }

  login(username, password, remember) {
    let request = {
      "username": username,
      "password": password,
      "remember": remember
    };

    return this.getResource("login").update(request).$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.LOGIN)
    );
  }

  logout() {
    return this.getResource("logout").del().$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.LOGOUT)
    );
  }

  getUserProfile() {
    return this.getResource("profile").get().$promise;
  }

  changePassword(newPassword) {
    return this.getResource("change/password").update(newPassword).$promise.then(this.getAvailability());
  }

  createUser(fullname, username, password, email, number, floor) {
    let request;
    if (number != null) {
      request = {
        account: {
          "fullName": fullname,
          "username": username,
          "password": password,
          "email": email
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
          "password": password,
          "email": email
        }
      };
    }


    return this.getResource("createUser").create(request).$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.CREATEUSER)
    );
  }


  editUser(fullname, username, password, email, regno1, regno2) {
    if (regno1 === undefined) {
      regno1 = null;
    }
    if (regno2 === undefined) {
      regno2 = null;
    }
    let request;
    request = {
      account: {
        "fullName": fullname,
        "username": username,
        "password": password,
        "email": email
        , carList: [{
          "regNo": regno1
        },
          {
            "regNo": regno2
          }]
      }
    };


    return this.getResource("editUser").create(request).$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.EDITUSER)
    );
  }
}
