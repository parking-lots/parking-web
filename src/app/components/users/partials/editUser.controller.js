export class EditUserController {
  constructor($location, $scope, $modalInstance, toastr, ResourceService) {
    "ngInject";

    this.location = $location;
    this.scope = $scope;
    this.modalInstance = $modalInstance;
    this.toastr = toastr;
    this.ResourceService = ResourceService;
    this.modalWindow($scope, $modalInstance, toastr, ResourceService);
  }

  modalWindow($scope, $uibModalInstance, toastr, ResourceService) {
    $scope.ok = function () {
      $uibModalInstance.dismiss();
    };

    $scope.editUser = editUser;

    function editUser(formData) {
      ResourceService.editUser(formData.fullname, formData.username, formData.password, formData.email, formData.firstCar, formData.secondCar)
        .then(response => {
          onNewUserSuccess();
        }).catch(response => {
        onNewUserError(response);
      });
    }

    function onEditUserError(response) {
      toastr.error(response.data.errors[0].message);
    }

    function onEditUserSuccess() {
      toastr.success("You have successfully added new user.");
      $uibModalInstance.dismiss('cancel');
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

}
