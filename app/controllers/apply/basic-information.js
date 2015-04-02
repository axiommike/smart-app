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
		{value: "rental", label: "I want to purchase a rental"},
		{value: "advice", label: "I need some advice"}
	],
	coApplicantCount: 0,
	actions: {
		nextStep: function() {
			if (this.get("coApplicantCount") > 0) {
				for (let i = 0; i <= this.get("coApplicantCount"); i++) {
					let addedCoApplicant = this.store.createRecord("applicant");
					this.get("model.coApplicants").pushObject(addedCoApplicant);
				}
			}
			this.get("model").save().then((application) => {
					this.transitionToRoute("apply.assets", application);
				}
			);
		}
	}
});
