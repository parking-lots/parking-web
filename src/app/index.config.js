export function config ($logProvider, toastrConfig, $httpProvider) {
  "ngInject";
  // Enable log
  $logProvider.debugEnabled(true);
  $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa("jurgis:jurgis");
  console.log("shitisset");

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = "toast-top-right";
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
