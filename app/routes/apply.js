import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		console.log("Apply route triggered");
		if (params["application_id"]) {
			if (params.application_id !== "apply") {
				return this.store.find("application", params.application_id);
			}
		}
		let emptyApplicant = this.store.createRecord("applicant", {isPrimary: true}), emptyApplication = this.store.createRecord("application"), applicantPrimaryAddress = this.store.createRecord("address", {isCurrent: true});
		emptyApplicant.set("currentAddress", applicantPrimaryAddress);
		emptyApplication.set("applicant", emptyApplicant);
		return emptyApplication;
	}
});
