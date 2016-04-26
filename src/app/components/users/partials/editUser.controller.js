export class EditUserController {
  constructor($location, $scope, $modalInstance, $modal, user, toastr, ResourceService) {
    "ngInject";
    console.log($modalInstance);
    this.location = $location;
    this.scope = $scope;
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
    console.log(this.user.carList);
    if(this.user.carList.length > 0){
        if (angular.isDefined(this.user.carList[0].regNo)) {
              this.scope.editUserForm.firstCar = this.user.carList[0].regNo;
            }
        if (angular.isDefined(this.user.carList[1].regNo)) {
                      this.scope.editUserForm.secondCar = this.user.carList[1].regNo;
         }
     }
     }

  editUser(form) {
    console.log(form);
    console.log(form.username.$modelValue);
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
    }

  close() {
    this.modalInstance.dismiss();
  }

     cancel() {
        $uibModalInstance.dismiss('cancel');
      }

}
