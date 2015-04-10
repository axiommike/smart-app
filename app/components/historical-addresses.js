import Ember from "ember";

export default Ember.Component.extend({
	previousAddresses: Ember.A(),
	currentAddress: null,
	addresses: Ember.computed("currentAddress", "previousAddresses", function() {
		return Ember.makeArray(this.get("previousAddresses").slice().concat(this.get("currentAddress")));
	}),
	minHistory: 3, /* How many years back are required - Expert requires 3 */
	previousAddressesRequired: Ember.computed.lt("currentAddress.tenureTotalYears", 3),
	previousAddressTimespan: Ember.computed("addresses.@each.tenureTotalYears", function() {
		let addresses = this.get("addresses");
		return addresses.reduce(function(previousValue, address) {
			return previousValue + address.get("tenureTotalYears");
		}, 0);
	}),
	additionalPreviousAddressesRequired: Ember.computed("previousAddresses", "currentAddress", function() {
		let currentAddressDuration = this.get("currentAddress.tenureTotalYears"), totalDuration = 0;
		if (currentAddressDuration) {
			this.get("previousAddresses").forEach((address) => {
				totalDuration += address.get("tenureTotalYears");
			});
			return totalDuration <= this.get("maxHistory");
		}
		else {
			return false;
		}
	}),
	onAddAddress: null,
	actions: {
		addAddress: function() {
			this.sendAction("onAddAddress");
		},
		removeAddress: function(address) {
			this.get("previousAddresses").removeObject(address);
		}
	}
});
