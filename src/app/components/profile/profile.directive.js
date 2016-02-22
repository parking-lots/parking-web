export function ProfileDirective() {
  "ngInject";

  return {
    restrict: "A",
    templateUrl: "app/components/profile/profile.html",
    controller: ProfileController,
    controllerAs: "vm",
    bindToController: true
  };
}

class ProfileController {
  constructor (AvailabilityService, toastr) {
    "ngInject";

    this.AvailabilityService = AvailabilityService;
    this.toastr = toastr;
    this.showProfile = false;
    this.setProfileData();
  }

  setProfileData() {
    this.AvailabilityService.getUserProfile()
      .then(profile => {
        console.log(profile);
        this.profile = profile;
        this.showProfile = true;
      })
      .catch(e => {
        console.log(e);
      });
  }

  logout() {
    this.AvailabilityService.logout()
      .then( _=> this.redirectToLogin())
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
    this.AvailabilityService.changePassword(this.changePasswordForm)
      .then(result  => {
        this.toastr.success("Your password changed successfully");
        this.changePasswordForm.newPassword = "";
      }).catch(response => {
        console.log(response);
        this.toastr.error(response.data.errors[0].message);
      });
  }
}
