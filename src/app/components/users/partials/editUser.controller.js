export class EditUserController {
  constructor($location, $scope, $modalInstance, $modal, user, toastr, ResourceService, UsersService, $route) {
    "ngInject";
    this.UsersService = UsersService;
    this.location = $location;
    this.scope = $scope;
    this.route = $route;
    this.modalInstance = $modalInstance;
    this.toastr = toastr;
    this.ResourceService = ResourceService;
    this.user = user;
    this.activate();
  }

  activate() {
    this.scope.editUserForm = {
      fullname: this.user.fullName,
      username: this.user.username,
    };

    if (angular.isDefined(this.user.email)) {
      this.scope.editUserForm.email = this.user.email;
    }

    if (this.user.carList.length > 0) {
      if (angular.isDefined(this.user.carList[0].regNo)) {
        this.scope.editUserForm.firstCar = this.user.carList[0].regNo;
      }
      if (this.user.carList.length > 1 && angular.isDefined(this.user.carList[1].regNo)) {
        this.scope.editUserForm.secondCar = this.user.carList[1].regNo;
      }
    }
  }

  editUser(form) {
    this.ResourceService.editUser(form.fullname.$modelValue, form.username.$modelValue, form.password.$modelValue, form.email.$modelValue, form.firstCar.$modelValue, form.secondCar.$modelValue) //formData.password, formData.email, formData.firstCar, formData.secondCar)
      .then(response => {
        this.onEditUserSuccess();
      }).catch(response => {
      this.onEditUserError(response);
    });
  }

  onEditUserError(response) {
    this.toastr.error(response.data.errors[0].message);
  }

  onEditUserSuccess() {
    this.toastr.success("You have successfully updated a user.");
    this.modalInstance.dismiss();
    
    this.route.reload();
  }

  close() {
    this.modalInstance.dismiss();
  }

  cancel() {
    $uibModalInstance.dismiss('cancel');
  }

}
