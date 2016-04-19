export class NewUserController {
  constructor ($location, $scope, $modalInstance, ResourceService) {
    "ngInject";

    this.location = $location;
    this.scope = $scope;
    this.modalInstance = $modalInstance;
    this.ResourceService = ResourceService;
    this.modalWindow($scope, $modalInstance, ResourceService);
  }

  modalWindow($scope, $uibModalInstance, ResourceService) {
    $scope.ok = function () {
      $uibModalInstance.dismiss();
    };

    $scope.addNewUser = addNewUser;

    function addNewUser(formData) {
      ResourceService.createUser(formData.fullname, formData.username, formData.password, formData.number, formData.floor)
        .then( response => {
          onNewUserSuccess();
        }).catch( response => {
          onNewUserError(response);
        });
    }

    function onNewUserError(response){
      console.log(response);
      console.log('error');
    }

    function onNewUserSuccess(){
      console.log("success");
      $uibModalInstance.dismiss('cancel');
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

}
