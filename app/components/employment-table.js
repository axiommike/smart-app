import Ember from "ember";

export default Ember.Component.extend({
	employment: Ember.A(),
	currentEmployment: Ember.A(),
	previousEmployment: Ember.A(),
	onAddEmployment: null,
	onRemoveEmployment: null,
	minHistory: 3,
	totalEmploymentTimespan: Ember.computed("employment.@each.tenureTotalYears", function() {
		let allEmployment = this.get("employment");
		return allEmployment.reduce(function(previousValue, employment) {
			return previousValue + employment.get("tenureTotalYears");
		}, 0);
	}),
	previousEmploymentRequired: Ember.computed.lt("totalEmploymentTimespan", 3),
	autoCreateEmployment: function() {
		if (this.get("previousEmploymentRequired")) {
			if (this.get("previousEmployment.length") === 0) {
				this.sendAction("onAddEmployment");
			}
		}
	}.observes("employment.@each.tenureTotalYears"),
	actions: {
		addEmployment: function() {
			this.sendAction("onAddEmployment");
		},
		removeEmployment: function(employment) {
			this.sendAction("onRemoveEmployment", employment);
		}
	}
});
