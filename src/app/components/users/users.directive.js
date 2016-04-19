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
  constructor($location, UsersService) {
    "ngInject";

    this.location = $location;
    this.UsersService = UsersService;
    this.setUsersData();
    this.showForm();
  }

  showForm () {

      var modalInstance = $ui.bootstrap.modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'partials/createUserForm.html',
        controller: 'CreateNewUserController',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
        })
        }


  setUsersData() {
    this.UsersService.getUsers().$promise
      .then( response => {
        this.users = response;
        console.log(response);
      }).catch (response => {
      if (response.status === 401 || response.status === 403) {
        this.redirectToLogin();
      }
    });
  }

  redirectToLogin() {
    this.location.path("/");
  }
}
