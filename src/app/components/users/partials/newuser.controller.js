export class NewUserController {
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

    $scope.addNewUser = addNewUser;

    function addNewUser(formData) {
      ResourceService.createUser(formData.fullname, formData.username, formData.password, formData.number, formData.floor)
        .then(response => {
          onNewUserSuccess();
        }).catch(response => {
        onNewUserError(response);
      });
    }

    function onNewUserError(response) {
      toastr.error(response.data.errors[0].message);
    }

    function onNewUserSuccess() {
      toastr.success("You have successfully added new user.");
      $uibModalInstance.dismiss('cancel');
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

}
