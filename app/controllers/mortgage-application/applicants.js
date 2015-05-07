import Ember from "ember";

export default Ember.Controller.extend({
	actions: {
		addApplicant: function() {
			this.send("addApplicantMaster");
		},
		addEmployment: function(applicant) {
			this.send("addEmploymentMaster", applicant, false);
		},
		removeEmployment: function(employment) {
			this.send("removeEmploymentMaster", employment);
		},
		copyAddresses: function(applicant) {
			console.log("copy addresses triggered");
			let primaryApplicantAddresses = this.get("model.applicant.previousAddresses");
			applicant.get("previousAddresses").pushObjects(primaryApplicantAddresses); // this fails because currentAddress is a function of currentProperty, and currentProperty is read-only
		},
		removeApplicant: function(applicant) {
			this.send("removeApplicantMaster", applicant);
		},
		nextStep: function() {
			if (this.get("model.applicant.properties.length")) {
				this.send("saveAssets");
				this.send("saveLiabilities");
				this.send("saveProperties");
			}
			if (this.get("model.applicant.employment.length")) {
				this.send("saveEmployment");
			}
			if (this.get("model.applicants.length") > 0) {
				this.send("saveApplicants");
			}
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.assets", application);
			});
		}
	}
});
