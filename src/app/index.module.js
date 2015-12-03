/* moment:false */

import { config } from "./index.config";
import { routerConfig } from "./index.route";
import { runBlock } from "./index.run";
import { AvailabilityConstant } from "../app/components/availability/availability.constant";
import { AvailabilityService } from "../app/components/availability/availability.service";
import { MainController } from "./main/main.controller";
import { AvailabilityDirective } from "../app/components/availability/availability.directive";

angular.module("parkingLots", ["ngResource", "ngRoute", "ui.bootstrap", "toastr"])
  .constant("moment", moment)
  .constant("AvailabilityConstant", new AvailabilityConstant())
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service("AvailabilityService", AvailabilityService)
  .controller("MainController", MainController)
  .directive("availability", AvailabilityDirective);
