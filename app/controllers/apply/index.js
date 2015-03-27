import Ember from "ember";

export default Ember.ObjectController.extend({
	actions: {
		nextStep: function() {
			this.get("model").save().then((applicant) => {
				var emptyApplication = this.store.createRecord("application");
				emptyApplication.set("applicant", applicant);
				emptyApplication.save().then((savedApplication) => {
					this.transitionToRoute("apply.basic-information", savedApplication);
				});
			});
		}
	}
});
