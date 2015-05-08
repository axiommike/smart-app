import Ember from "ember";

export default Ember.Controller.extend({
	consentProvided: false,
	consentRequired: Ember.computed.not("consentProvided"),
	actions: {
		addApplicant: function() {
			this.send("addApplicantMaster");
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
		nextStep: function() {
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.thank-you");
			});
		}
	}
});
