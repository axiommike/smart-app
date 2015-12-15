import Ember from "ember";

export default Ember.Controller.extend({
	consentProvided: false,
	consentRequired: Ember.computed.not("consentProvided"),
	actions: {
		addApplicant: function() {
			this.send("addApplicantMaster");
		},
		removeApplicant: function(applicant) {
			this.send("removeApplicantMaster", applicant);
		},
		addAsset: function() {
			this.send("addAssetMaster", this.get("model.applicant"));
		},
		removeAsset: function(asset) {
			this.send("removeAssetMaster", asset);
			this.get("model.applicant").save();
		},
		addIncome: function(applicant) {
			this.send("addIncomeMaster", this.get("model.applicant"));
		},
		removeIncome: function(income) {
			this.send("removeIncomeMaster", income);
			this.get("model.applicant").save();
		},
		addLiability: function() {
			this.send("addLiabilityMaster", this.get("model.applicant"));
		},
		removeLiability: function(liability) {
			this.send("removeLiabilityMaster", liability);
			this.get("model.applicant").save();
		},
		addAddress: function(applicant) {
			this.send("addAddressMaster", applicant);
		},
		removeAddress: function(address) {
			this.send("removeAddressMaster", address);
		},
		copyAddresses: function(applicant) {
			let primaryApplicantAddresses = this.get("model.applicant.previousAddresses");
			applicant.get("previousAddresses").pushObjects(primaryApplicantAddresses);
			applicant.set("currentAddress", this.get("model.applicant.currentAddress"));
		},
		unlinkAddresses: function(applicant, previousCurrentAddress) {
			let primaryApplicantAddresses = this.get("model.applicant.previousAddresses");
			applicant.get("previousAddresses").removeObjects(primaryApplicantAddresses);
			applicant.set("currentAddress", previousCurrentAddress);
		},
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.thank-you");
			});
		}
	}
});
