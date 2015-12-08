export function runBlock ($rootScope, $location, $cookies, $http) {
  "ngInject";

  $rootScope.globals = $cookies.get("globals") || {};
    if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common["Authorization"] = "Basic " + $rootScope.globals.currentUser.authdata;
  }

  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if ($location.path() !== "/login" && !$rootScope.globals.currentUser) {
      console.log("Redirecting to login...");
      $location.path("/login");
    }
  });
}
