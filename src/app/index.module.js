/* moment:false */

import { config } from "./index.config";
import { routerConfig } from "./index.route";
import { runBlock } from "./index.run";
import { Base64 } from "../app/components/auth/base64.factory";
import { AuthenticationService } from "../app/components/auth/authentication.service";
import { AvailabilityConstant } from "../app/components/availability/availability.constant";
import { AvailabilityService } from "../app/components/availability/availability.service";
import { LoginController } from "./auth/login.controller";
import { MainController } from "./main/main.controller";
import { AvailabilityDirective } from "../app/components/availability/availability.directive";
import { ProfileDirective } from "../app/components/profile/profile.directive";

angular.module("parkingLots", ["Authentication", "ngResource", "ngRoute", "ngCookies", "ui.bootstrap", "toastr"])
  .constant("moment", moment)
  .config(config)
  .constant("AvailabilityConstant", new AvailabilityConstant())
  .config(routerConfig)
  .run(runBlock)
  .service("AvailabilityService", AvailabilityService)
  .controller("MainController", MainController)
  .directive("availability", AvailabilityDirective)
  .directive("profile", ProfileDirective);

angular.module('Authentication', [])
  .service("AuthenticationService", AuthenticationService)
  .controller("LoginController", LoginController);
