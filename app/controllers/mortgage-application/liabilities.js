import Ember from "ember";

export default Ember.Controller.extend({
	hasCreditCard: false,
	creditCardToggled: function() {
		if (this.get("hasCreditCard") && this.get("model.applicant.creditCardLiabilities.length") === 0) {
			this.send("addLiability", "credit-card");
		}
	}.observes("hasCreditCard"),
	hasLineOfCredit: false,
	lineOfCreditToggled: function() {
		if (this.get("hasLineOfCredit") && this.get("model.applicant.lineOfCreditLiabilities.length") === 0) {
			this.send("addLiability", "line-of-credit");
		}
	}.observes("hasLineOfCredit"),
	hasLoans: false,
	loansToggled: function() {
		if (this.get("hasLoans") && this.get("model.applicant.loanLiabilities.length") === 0) {
			this.send("addLiability", "loan");
		}
	}.observes("hasLoans"),
	hasChildSupport: false,
	childSupportToggled: function() {
		if (this.get("hasChildSupport") && this.get("model.applicant.childSupportLiabilities.length") === 0) {
			this.send("addLiability", "child-support");
		}
	}.observes("hasChildSupport"),
	hasOtherLiabilities: false,
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
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.summary", application);
			});
		}
	}
});
