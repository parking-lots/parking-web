export function config($logProvider, toastrConfig, $httpProvider, $locationProvider, datepickerPopupConfig) {
  "ngInject";
  // Enable log
  $logProvider.debugEnabled(true);
  $httpProvider.defaults.withCredentials = true;

  $locationProvider.html5Mode(true);
  datepickerPopupConfig.startingDay = 1;

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = "toast-top-right";
  toastrConfig.preventDuplicates = true;
  toastrConfig.closeButton = true;
}
