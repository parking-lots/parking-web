export class NewUserController {
  constructor ($location, $scope, $modalInstance) {
    "ngInject";

    this.location = $location;
    this.scope = $scope;
    this.modalInstance = $modalInstance;
    this.modalWindow($scope, $modalInstance);
  }

  modalWindow($scope, $uibModalInstance) {
    $scope.ok = function () {
      $uibModalInstance.dismiss();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}
