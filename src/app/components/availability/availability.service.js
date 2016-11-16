export class AvailabilityService {
  constructor($resource, moment, AvailabilityConstant, ENV_VARS) {
    "ngInject";

    this.moment = moment;

    this.getResource = (scope = "list", parameter = "") => $resource(ENV_VARS.apiUrl.concat(AvailabilityConstant.getUri(scope, parameter)), null, {
      "get": {"method": "GET"},
      "del": {"method": "DELETE"},
      "update": {"method": "PUT"},
      "updateProfile": {"method": "POST"}
    });
  }

  getAvailability() {
    return this.getResource().query();
  }

  /**
   * Free up lot x day(-s) ahead, by default 1 day
   *
   * @param lot
   * @param days
   * @returns {*|Function}
     */
  freeUpLot(lot, days = 1) {
    lot.freeFrom = this.moment(new Date).format("YYYY-MM-DD");
    lot.freeTill = this.moment(new Date).add(days, 'days').format("YYYY-MM-DD");
    return this.getResource("reserve").del(lot).$promise;
  }

  shareSpot(lot) {
    lot.from = this.moment(lot.from).format("YYYY-MM-DD").toString();
    lot.till = this.moment(lot.till).format("YYYY-MM-DD").toString();
    return this.getResource("updateList").update(lot).$promise.then(this.getAvailability());
  }

  takeSpotBack() {
    return this.getResource().del().$promise;
  }

  reserveFreeSpot(lot) {
    return this.getResource("reserve", lot.number).update().$promise.then(this.getAvailability());
  }

  getUserProfile() {
    return this.getResource("profile").get().$promise.then(this.getAvailability());
  }

  changePassword(newPassword) {
    let updatedPofile = {
      "password": newPassword.newPassword
    };
    return this.getResource("change/password").updateProfile(updatedPofile).$promise.then(this.getAvailability());
  }

  reset() {

  }

  resetLot(lot) {
    console.log("Deleting lot to bring it back...");
    console.log(lot);
    return this.getResource().delete(lot).$promise;
  }

  findCurrentLot() {
    return this.getAvailability().$promise.then(lots => lots.filter(lot => !!lot.user)[0]);
  }

  logout() {
    return this.getResource("logout").del().$promise.then(this.getAvailability()); //@todo check if callback is necessary
  }
}
