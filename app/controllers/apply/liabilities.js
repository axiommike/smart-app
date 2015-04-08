import Ember from "ember";

export default Ember.Controller.extend({
	actions: {
		addLiability: function() {
			let createdLiability = this.store.createRecord("liability");
			this.get("model.applicant.liabilities").pushObject(createdLiability);
		},
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("apply.applicants", application);
			});
		}
	}
});
