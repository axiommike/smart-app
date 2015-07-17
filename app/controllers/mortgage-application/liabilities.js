import Ember from "ember";

export default Ember.Controller.extend({
	hasCreditCard: Ember.computed.oneWay("model.applicant.creditCardLiabilities.length"),
	creditCardToggled: function() {
		if (this.get("hasCreditCard") && this.get("model.applicant.creditCardLiabilities.length") === 0) {
			this.send("addLiability", "credit-card");
		}
	}.observes("hasCreditCard"),
	hasLineOfCredit: Ember.computed.oneWay("model.applicant.lineOfCreditLiabilities.length"),
	lineOfCreditToggled: function() {
		if (this.get("hasLineOfCredit") && this.get("model.applicant.lineOfCreditLiabilities.length") === 0) {
			this.send("addLiability", "line-of-credit");
		}
	}.observes("hasLineOfCredit"),
	hasLoans: Ember.computed.oneWay("model.applicant.loanLiabilities.length"),
	loansToggled: function() {
		if (this.get("hasLoans") && this.get("model.applicant.loanLiabilities.length") === 0) {
			this.send("addLiability", "loan");
		}
	}.observes("hasLoans"),
	hasChildSupport: Ember.computed.oneWay("model.applicant.childSupportLiabilities.length"),
	childSupportToggled: function() {
		if (this.get("hasChildSupport") && this.get("model.applicant.childSupportLiabilities.length") === 0) {
			this.send("addLiability", "child-support");
		}
	}.observes("hasChildSupport"),
	hasOtherLiabilities: Ember.computed.oneWay("model.applicant.otherLiabilities.length"),
	otherLiabilitiesToggled: function() {
		if (this.get("hasOtherLiabilities") && this.get("model.applicant.otherLiabilities.length") === 0) {
			this.send("addLiability", "other");
		}
	}.observes("hasOtherLiabilities"),
	actions: {
		addLiability: function(type) {
			this.send("addLiabilityMaster", this.get("model.applicant"), type);
		},
		removeLiability: function(liability) {
			this.send("removeLiabilityMaster", liability);
		},
		nextStep: function() {
			this.send("saveLiabilities");
			this.get("model.applicant").save().then((savedApplicant) => {
				this.get("model").save().then((application) => {
					this.transitionToRoute("mortgage-application.summary", application);
				});
			});
		}
	}
});
