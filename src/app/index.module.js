import {config} from "./index.config";
import {routerConfig} from "./index.route";
import {Base64} from "../app/components/auth/base64.factory";
import {ResourceService} from "../app/components/resource/resource.service";
import {AuthenticationService} from "../app/components/auth/authentication.service";
import {EventsConstant} from "../app/components/events.constant";
import {UsersConstant} from "../app/components/users/users.constant";
import {AvailabilityConstant} from "../app/components/availability/availability.constant";
import {AvailabilityService} from "../app/components/availability/availability.service";
import {UsersService} from "../app/components/users/users.service";
import {LoginController} from "./auth/login.controller";
import {MainController} from "./main/main.controller";
import {AdminController} from "./admin/admin.controller";
import {NewUserController} from "../app/components/users/partials/newuser.controller";
import {EditUserController} from "../app/components/users/partials/editUser.controller";
import {UsersDirective} from "../app/components/users/users.directive";
import {AvailabilityDirective} from "../app/components/availability/availability.directive";
import {HeaderDirective} from "../app/components/header/header.directive";
import {ngConstant} from "./config"

angular.module("parkingLots", ["Authentication", "ngResource", "ngRoute", "ngCookies", "ui.bootstrap", "toastr"])
  .constant("moment", moment)
  .config(config)
  .constant("EventsConstant", new EventsConstant())
  .constant("UsersConstant", new UsersConstant())
  .constant("AvailabilityConstant", new AvailabilityConstant())
  .config(routerConfig)
  .service("ResourceService", ResourceService)
  .service("AvailabilityService", AvailabilityService)
  .service("UsersService", UsersService)
  .controller("MainController", MainController)
  .controller("AdminController", AdminController)
  .controller("NewUserController", NewUserController)
  .controller("EditUserController", EditUserController)
  .directive("users", UsersDirective)
  .directive("availability", AvailabilityDirective)
  .directive("header", HeaderDirective)
  .constant("ENV_VARS", new ngConstant());

angular.module('Authentication', [])
  .service("AuthenticationService", AuthenticationService)
  .controller("LoginController", LoginController);
