export function routerConfig ($routeProvider) {
  "ngInject";

  $routeProvider
    .when("/login", {
      templateUrl: "app/auth/login.html",
      controller: "LoginController",
      controllerAs: "login"
    })
    .when("/", {
      templateUrl: "app/main/main.html",
      controller: "MainController",
      controllerAs: "main"
    })
    .otherwise({
      redirectTo: "/login"
    });
}
