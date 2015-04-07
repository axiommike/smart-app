import Ember from "ember";

export default Ember.Component.extend({
	previousAddresses: Ember.A(),
	currentAddress: null,
	minHistory: 3, /* How many years back are required - Expert requires 3 */
	previousAddressesRequired: Ember.computed("previousAddresses", "currentAddress", function() {
		let currentAddressDuration = this.get("currentAddress.tenureTotalYears"), totalDuration = 0;
		if (currentAddressDuration) {
			this.get("previousAddresses").forEach((address) => {
				totalDuration += address.get("tenureTotalYears");
			});
			return totalDuration >= this.get("maxHistory");
		}
		else {
			return false;
		}
	})
});
