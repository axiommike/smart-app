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
	emptyPreviousEmployment: Ember.computed.filterBy("previousEmployment", "tenureTotalYears", 0),
	emptyEmployment: Ember.computed.filterBy("employment", "tenureTotalYears", 0),
	nonEmptyPreviousEmployment: Ember.computed.setDiff("previousEmployment", "emptyPreviousEmployment"),
	/**
	 * Automatically create a previous employment if the total tenure for all employment is less than 3 years
	 */
	autoCreateEmployment: function() {
		if (this.get("currentEmployment.length") === 0) {
			this.sendAction("onAddEmployment");
		}
		if (this.get("previousEmploymentRequired")) {
			if (this.get("emptyEmployment.length") === 0) { // auto-create employment only if there are no pending historical employments with 0 as their total tenure
				console.log(`Triggered auto-create on employment`);
				this.sendAction("onAddEmployment");
			}
		}
		else {
			// destroy any pending, empty employment if the total tenure is 3 years already
			if (this.get("emptyPreviousEmployment.length") > 0) {
				this.get("employment").removeObjects(this.get("emptyPreviousEmployment"));
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
