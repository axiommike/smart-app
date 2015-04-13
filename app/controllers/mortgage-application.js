import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		sendIncomplete: function() {
			let incompleteApplication = this.get("model");
			incompleteApplication.set("isIncomplete", true);
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.thank-you", application);
			})
		}
	}
});
