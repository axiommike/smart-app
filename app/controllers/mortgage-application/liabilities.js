import Ember from "ember";

export default Ember.Controller.extend({
	allLiabilities: Ember.computed("model.applicant.liabilities", "model.applicant.properties", function() {
		return this.get("model.applicant.liabilities").concat(this.get("model.applicant.mortgages"));
	}),
	actions: {
		addLiability: function() {
			let createdLiability = this.store.createRecord("liability");
			this.get("model.applicant.liabilities").pushObject(createdLiability);
		},
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.applicants", application);
			});
		}
	}
});
