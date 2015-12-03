import Ember from "ember";

export default Ember.Controller.extend({
	actions: {
		addApplicant: function() {
			this.send("addApplicantMaster");
			return this.get("model").save();
		},
		addEmployment: function(applicant) {
			console.log(`add employment triggered`);
			this.send("addEmploymentMaster", applicant, false);
		},
		removeEmployment: function(employment) {
			console.log(`Remove Employment triggered`);
			this.send("removeEmploymentMaster", employment);
		},
		addAddress: function(applicant) {
			this.send("addAddressMaster", applicant);
		},
		removeAddress: function(address) {
			this.send("removeAddressMaster", address);
		},
		addIncome: function(applicant) {
			this.send("addIncomeMaster", applicant);
			return applicant.save();
		},
		removeIncome: function(income) {
			this.send("removeIncomeMaster", income);
		},
		copyAddresses: function(applicant) {
			console.log("copy addresses triggered");
			let primaryApplicantAddresses = this.get("model.applicant.previousAddresses");
			applicant.get("previousAddresses").pushObjects(primaryApplicantAddresses);
			applicant.set("currentAddress", this.get("model.applicant.currentAddress"));
		},
		unlinkAddresses: function(applicant, previousCurrentAddress) {
			let primaryApplicantAddresses = this.get("model.applicant.previousAddresses");
			applicant.get("previousAddresses").removeObjects(primaryApplicantAddresses);
			applicant.set("currentAddress", previousCurrentAddress);
		},
		removeApplicant: function(applicant) {
			this.send("removeApplicantMaster", applicant);
			return this.get("model").save();
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
