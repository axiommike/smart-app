import Ember from "ember";

export default Ember.Controller.extend({
	actions: {
		addLiability: function() {
			let createdLiability = this.store.createRecord("liability");
			this.get("model.applicant.liabilities").pushObject(createdLiability);
		},
		removeLiability: function(liability) {
			liability.destroyRecord().then((deletedLiability) => {
				console.log(`Successfully delete liability ${deletedLiability.get("id")}`);
			});
		},
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.summary", application);
			});
		}
	}
});
