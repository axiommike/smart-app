import Ember from "ember";

export default Ember.ObjectController.extend({
	actions: {
		addEmployment: function(applicant) {
			let addedEmployment = this.store.createRecord("employment"), addedEmploymentCompany = this.store.createRecord("company");
			addedEmployment.set("company", addedEmploymentCompany);
			applicant.get("employment").pushObject(addedEmployment);
		},
		nextStep: function() {

		}
	}
});
