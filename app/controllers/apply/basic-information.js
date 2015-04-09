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
	tips: [
		{property: "applicant.phone", tooltip: "We'll use your phone number"},
		{property: "applicant.email"},
		{property: "source"},
		{property: "type"},
		{property: "coApplicantCount"}
	],
	martialStatusOptions: [
		{value: "single", label: "Single"},
		{value: "married", label: "Married"},
		{value: "Divorced", label: "Divorced"}
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
