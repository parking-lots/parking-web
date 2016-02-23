export function HeaderDirective() {
  "ngInject";

  return {
    restrict: "E",
    templateUrl: "app/components/header/header.html",
    controller: HeaderController,
    controllerAs: "vm",
    bindToController: true
  };
}

class HeaderController {
  constructor ($scope, $location, ResourceService, EventsConstant, toastr) {
    "ngInject";

    this.ResourceService = ResourceService;
    this.toastr = toastr;
    this.location = $location;
    this.profile = false;

    this.setProfileData();
    $scope.$on(EventsConstant.LOGIN, angular.bind(this, this.onLogin));
    $scope.$on(EventsConstant.LOGOUT, angular.bind(this, this.onLogout));
  }

  onLogin() {
    this.setProfileData();
  }

  onLogout() {
    this.logout();
  }

  setProfileData() {
    this.ResourceService.getUserProfile()
      .then(profile => {
        console.log(profile);
        this.profile = profile;
      })
      .catch(e => {
        console.log(e);
      });
  }

  logout() {
    this.ResourceService.logout()
      .then( _=> {
        this.profile = false;
        this.redirectToLogin()
      })
      .catch(response => this.onLogoutError(response));
  }

  redirectToLogin() {
    this.location.path("/login");
  }

  onLogoutError(response) {
    if (response.data.message === "not_logged") {
      this.location.path("/login");
    }
  }

  changePassword(password) {
    console.log(this.changePasswordForm);
    this.ResourceService.changePassword(this.changePasswordForm)
      .then(result  => {
        this.toastr.success("Your password changed successfully");
        this.changePasswordForm.newPassword = "";
      }).catch(response => {
        console.log(response);
        this.toastr.error(response.data.errors[0].message);
      });
  }
}
