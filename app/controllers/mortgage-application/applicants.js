import Ember from "ember";

export default Ember.ObjectController.extend({
	actions: {
		removeApplicant: function(applicant) {
			this.get("model.applicants").removeObject(applicant);
		},
		addApplicant: function() {
			let addedApplicant = this.store.createRecord("applicant");
			this.get("model.applicants").pushObject(addedApplicant);
		},
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.summary", application);
			});
		}
	}
});
