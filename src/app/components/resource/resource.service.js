export class ResourceService {
  constructor($resource, $rootScope, EventsConstant) {
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
      "profile": "profile",
      "createUser": "admin/user/create",
      "removeParking": "/parking/remove",
      "editUser": "admin/user/edit"
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


    return this.getResource("editUser").save(request).$promise.then(
      _ => this.rootScope.$broadcast(this.EVENTS.EDITUSER)
    );
  }


}
