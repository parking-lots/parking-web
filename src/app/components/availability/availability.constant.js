export function AvailabilityConstant() {
  "ngInject";

  let domain = "http://www.devone.lt:9000/",
      URI = {
        "list": "parking/available"
      };

  this.getUri = function(scope = "list") {
    return domain.concat(URI[scope]);
  }

}
