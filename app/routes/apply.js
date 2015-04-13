import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function(transition) {
		let emptyApplicant = this.store.createRecord("applicant", {isPrimary: true}), emptyApplication = this.store.createRecord("application"), applicantPrimaryAddress = this.store.createRecord("address", {isCurrent: true});
		emptyApplicant.set("currentAddress", applicantPrimaryAddress);
		emptyApplication.set("applicant", emptyApplicant);
		this.transitionTo("mortgage-application", emptyApplication);
	}
});
