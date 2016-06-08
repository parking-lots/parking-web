export function UsersDirective() {
  "ngInject";

  return {
    restrict: "E",
    templateUrl: "app/components/users/users.html",
    controller: UsersController,
    controllerAs: "vm",
    bindToController: true
  };
}

class UsersController {
  constructor($location, $modal, UsersService) {
    "ngInject";

    this.location = $location;
    this.modal = $modal;
    this.UsersService = UsersService;
    this.setUsersData();
  }

  setUsersData() {
    this.UsersService.getUsers().$promise
      .then(response => {
        this.users = response;
      }).catch(response => {
      if (response.status === 401 || response.status === 403) {
        this.redirectToLogin();
      }
    });
  }

  showNewUserForm() {
    var modalInstance = this.modal.open({
      templateUrl: 'app/components/users/partials/newUser.html',
      controller: 'NewUserController',
      bindToController: true,
      animation: true,
      keyboard: true
    });
  }

  showEditUserForm(user) {
    var modalInstance = this.modal.open({
      templateUrl: 'app/components/users/partials/editUser.html',
      controller: 'EditUserController',
      controllerAs: "vm",
      bindToController: true,
      animation: true,
      keyboard: true,
      resolve: {
        user: function () {
          return user;
        }
      }
    });

    modalInstance.result.then(function () {
    }, function (data) {
    });
  }

  redirectToLogin() {
    this.location.path("/");
  }

}
