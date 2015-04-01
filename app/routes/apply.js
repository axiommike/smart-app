import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		if (params["application_id"]) {
			if (params.application_id !== "apply") {
				return this.store.find("application", params.application_id);
			}
		}
		let emptyApplicant = this.store.createRecord("applicant", {isPrimary: true}), emptyApplication = this.store.createRecord("application");
		emptyApplication.set("applicant", emptyApplicant);
		return emptyApplication;
	}
});
