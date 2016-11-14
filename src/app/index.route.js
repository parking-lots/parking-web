export function routerConfig($routeProvider) {
  "ngInject";

  $routeProvider
    .when("/admin", {
      templateUrl: "app/admin/admin.html",
      controller: "AdminController",
      controllerAs: "admin"
    })
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
    .when("/profile", {
      templateUrl: "app/main/main.html",
      controller: "MainController",
      controllerAs: "main"
    })
    .otherwise({
      redirectTo: "/login"
    });
}
