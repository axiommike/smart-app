import Ember from "ember";

export default Ember.Controller.extend({
	hasChildSupport: false,
	actions: {
		addIncome: function(applicant, type) {
			let createdIncome = this.store.createRecord("income", {type: type});
			applicant.get("income").pushObject(createdIncome);
		}
	}
});
