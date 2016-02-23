/* moment:false */

import { config } from "./index.config";
import { routerConfig } from "./index.route";
import { runBlock } from "./index.run";
import { Base64 } from "../app/components/auth/base64.factory";
import { ResourceService } from "../app/components/resource/resource.service";
import { AuthenticationService } from "../app/components/auth/authentication.service";
import { EventsConstant } from "../app/components/events.constant";
import { AvailabilityConstant } from "../app/components/availability/availability.constant";
import { AvailabilityService } from "../app/components/availability/availability.service";
import { LoginController } from "./auth/login.controller";
import { MainController } from "./main/main.controller";
import { AvailabilityDirective } from "../app/components/availability/availability.directive";
import { HeaderDirective } from "../app/components/header/header.directive";

angular.module("parkingLots", ["Authentication", "ngResource", "ngRoute", "ngCookies", "ui.bootstrap", "toastr"])
  .constant("moment", moment)
  .config(config)
  .constant("EventsConstant", new EventsConstant())
  .constant("AvailabilityConstant", new AvailabilityConstant())
  .config(routerConfig)
  .run(runBlock)
  .service("ResourceService", ResourceService)
  .service("AvailabilityService", AvailabilityService)
  .controller("MainController", MainController)
  .directive("availability", AvailabilityDirective)
  .directive("header", HeaderDirective);

angular.module('Authentication', [])
  .service("AuthenticationService", AuthenticationService)
  .controller("LoginController", LoginController);
