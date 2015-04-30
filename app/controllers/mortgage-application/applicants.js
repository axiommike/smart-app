import Ember from "ember";

export default Ember.ObjectController.extend({
	actions: {
		addApplicant: function() {
			let applicantAddress = this.store.createRecord("address",
					{isCurrent: true}
				),
				applicantCurrentPropertyMortgage = this.store.createRecord("liability", {type: "mortgage"}),
				applicantCurrentPropertyAsset = this.store.createRecord("asset", {type: "property"}),
				applicantCurrentProperty = this.store.createRecord("property",
					{
						isCurrent: true,
						address: applicantAddress,
						asset: applicantCurrentPropertyAsset,
						mortgage: applicantCurrentPropertyMortgage
					}),
				addedApplicant = this.store.createRecord("applicant",
					{firstName: "New Applicant"}
				);
			addedApplicant.get("properties").pushObject(applicantCurrentProperty);
			this.get("model.applicants").pushObject(addedApplicant);
		},
		copyAddresses: function(applicant) {
			console.log("copy addresses triggered");
			let primaryApplicantAddresses = this.get("model.applicant.previousAddresses");
			applicant.get("previousAddresses").pushObjects(primaryApplicantAddresses);
		},
		removeApplicant: function(applicant) {
			this.get("model.applicants").removeObject(applicant);
		},
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.assets", application);
			});
		}
	}
});
