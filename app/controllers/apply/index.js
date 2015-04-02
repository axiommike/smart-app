import Ember from "ember";

export default Ember.ObjectController.extend({
	actions: {
		nextStep: function() {
			var model = this.get("model"), applicant = model.get("applicant");
			model.save().then((savedApplication) => {
				applicant.save().then((savedApplicant) => {
					console.dir(savedApplicant);
					this.transitionToRoute("apply.basic-information", savedApplication);
				});
			});
		}
	}
});
