export function runBlock ($rootScope, $location, $cookies, $http) {
  "ngInject";

  manageAuth($rootScope, $location, $cookies, $http); // @todo: Session Storage ???
}

function manageAuth($rootScope, $location, $cookies, $http) {
  const LOGIN_PATH = "/login";

  $rootScope.globals = angular.isString($cookies.get("globals")) ? JSON.parse($cookies.get("globals")) : {};

  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common["Authorization"] = "Basic " + $rootScope.globals.currentUser.authdata;
  }

  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if ($location.path() !== LOGIN_PATH && !$rootScope.globals.currentUser) {
      $location.path(LOGIN_PATH);
    }
  });
}
