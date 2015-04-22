import Ember from "ember";

export default Ember.ObjectController.extend({
	tips: [
		{property: "applicant.phone", tooltip: "We'll use your phone number"},
		{property: "applicant.email"},
		{property: "source"},
		{property: "type"},
		{property: "coApplicantCount"}
	],
	coApplicantCount: 0,
	actions: {
		nextStep: function() {
			if (this.get("coApplicantCount") > 0) {
				for (let i = 0; i <= this.get("coApplicantCount"); i++) {
					let addedCoApplicant = this.store.createRecord("applicant");
					addedCoApplicant.save().then((coApplicant) => {
						this.get("model.coApplicants").pushObject(coApplicant);
					});
				}
			}
			var model = this.get("model"), currentApplicant = model.get("applicant");
			currentApplicant.save().then((applicant) => {
				model.save().then((application) => {
						this.transitionToRoute("mortgage-application.assets", application);
					}
				);
			});
		}
	}
});
