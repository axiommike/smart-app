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
	currentAddressLongEnough: Ember.computed("currentAddress.tenureTotalYears", function() {
		if (this.get("nonEmptyPreviousAddresses.length") === 0) {
			return this.get("currentAddress.tenureTotalYears") >= this.get("minHistory");
		}
		else {
			return false;
		}
	}),
	autoCreatePreviousAddress: function() {
		if (this.get("previousAddressesRequired")) {
			if (this.get("emptyPreviousAddresses.length") === 0) { // auto-create an address only if there are no pending addresses with 0 as their total tenure
				this.sendAction("onAddAddress");
			}
		}
		else {
			// destroy any pending, empty addresses if the total tenure is 3 years already
			if (this.get("emptyPreviousAddresses.length") > 0) {
				this.get("previousAddresses").removeObjects(this.get("emptyPreviousAddresses"));
			}
		}
	}.observes("addresses.@each.tenureTotalYears"),
	emptyPreviousAddresses: Ember.computed.filterBy("previousAddresses", "tenureTotalYears", 0),
	nonEmptyPreviousAddresses: Ember.computed.setDiff("previousAddresses", "emptyPreviousAddresses"),
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
