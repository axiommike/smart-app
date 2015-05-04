import Ember from "ember";

export default Ember.Controller.extend({
	consentProvided: false,
	consentRequired: Ember.computed.not("consentProvided"),
	actions: {
		onAddApplicant: function() {
			this.send("addApplicant");
		},
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.thank-you");
			});
		}
	}
});
