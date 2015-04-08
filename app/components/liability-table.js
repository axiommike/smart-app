import Ember from "ember";

export default Ember.Component.extend({
	liabilities: Ember.A(),
	type: null,
	filteredLiabilities: Ember.computed.filter("liabilities", function(liability) {
		return this.get("type") ? liability.get("type") === this.get("type") : true;
	}),
	hasLiabilities: Ember.computed.notEmpty("filteredLiabilities"),
	actions: {
		addLiability: function() {
			let store = this.get("targetObject.store"), type = this.get("type"), liabilities = this.get("liabilities");
			let createdLiability = store.createRecord("liability");
			if (type) {
				createdLiability.set("type", type);
			}
			liabilities.pushObject(createdLiability);
		},
		removeLiability: function(liability) {
			return this.get("liabilities").removeObject(liability);
		}
	}
});
