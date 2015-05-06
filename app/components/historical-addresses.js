import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	previousAddresses: Ember.A(),
	currentAddress: null,
	addresses: Ember.computed("currentAddress", "previousAddresses", function() {
		return Ember.makeArray(this.get("previousAddresses").slice().concat(this.get("currentAddress")));
	}),
	minHistory: 3, /* How many years back are required - Expert requires 3 */
	previousAddressTimespan: Ember.computed("addresses.@each.tenureTotalYears", function() {
		let addresses = this.get("addresses");
		return addresses.reduce(function(previousValue, address) {
			return previousValue + address.get("tenureTotalYears");
		}, 0);
	}),
	previousAddressesRequired: Ember.computed.lt("previousAddressTimespan", 3),
	autoCreatePreviousAddress: function() {
		if (this.get("previousAddressesRequired")) {
			if (this.get("previousAddresses.length") === 0) {
				this.sendAction("onAddAddress");
			}
		}
	}.observes("currentAddress.tenureTotalYears"),
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
