export function runBlock ($rootScope, $location, $cookies, $http) {
  "ngInject";


  // if (angular.isDefined($cookies.get("globals"))) {
  //   let authdata = $cookies.get("globals");
  //   $http.defaults.headers.common["Authorization"] = "Basic " + authdata;
  // }
  //
  // $rootScope.$on("$locationChangeStart", function (event, next, current) {
  //   let authdataClear = angular.isUndefined($cookies.get("globals"));
  //   if ($location.path() !== "/login" && authdataClear) {
  //     console.log("Redirecting to login...");
  //     $location.path("/login");
  //   }
  // });
}
