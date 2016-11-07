export class NewUserController {
  constructor($location, $scope, $modalInstance, toastr, ResourceService, $route) {
    "ngInject";

    this.location = $location;
    this.scope = $scope;
    this.route = $route;
    this.modalInstance = $modalInstance;
    this.toastr = toastr;
    this.ResourceService = ResourceService;
    this.modalWindow($scope, $modalInstance, toastr, ResourceService, $route);
  }

  modalWindow($scope, $uibModalInstance, toastr, ResourceService, $route) {
    $scope.ok = function () {
      $uibModalInstance.dismiss();
    };

    $scope.addNewUser = addNewUser;

    function addNewUser(formData) {
      ResourceService.createUser(formData.fullname, formData.username, formData.password, formData.email, formData.number, formData.floor)
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
      $uibModalInstance.dismiss();

      $route.reload();
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

}
