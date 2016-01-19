export function config ($logProvider, toastrConfig, $httpProvider, $locationProvider) {
  "ngInject";
  // Enable log
  $logProvider.debugEnabled(true);
  $httpProvider.defaults.withCredentials = true;

  $locationProvider.html5Mode(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = "toast-top-full-width";
  toastrConfig.preventDuplicates = true;
  toastrConfig.closeButton = true;
}
