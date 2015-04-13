import Ember from "ember";

export default Ember.Controller.extend({
	actions: {
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.thank-you");
			});
		}
	}
});
