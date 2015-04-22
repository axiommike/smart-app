import Ember from "ember";

export default Ember.ObjectController.extend({
	sourceTypes: [
		{value: "phone", label: "Phone"},
		{value: "email", label: "Email"},
		{value: "word-of-mouth", label: "Word of Mouth"},
		{value: "other", label: "Other"}
	],
	goals: [
		{value: "purchase", label: "I want to purchase"},
		{value: "refinance", label: "I want to refinance"},
		{value: "renewal", label: "I want to renew my mortgage"},
		{value: "rental", label: "I want to purchase a rental"},
		{value: "advice", label: "I need some advice"}
	],
	actions: {
		nextStep: function() {
			var model = this.get("model"), applicant = model.get("applicant");
			model.save().then((savedApplication) => {
				applicant.save().then((savedApplicant) => {
					console.dir(savedApplicant);
					this.transitionToRoute("mortgage-application.applicants", savedApplication);
				});
			});
		}
	}
});
