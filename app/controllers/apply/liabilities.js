import Ember from "ember";

export default Ember.Controller.extend({
	actions: {
		nextStep: function() {
			this.get("model").save().then(function(application) => {
				this.transitionToRoute("apply.applicants", application);
			});
		}
	}
});
