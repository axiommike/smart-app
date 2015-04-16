import Ember from 'ember';

export default Ember.Controller.extend({
	lenders: [
		"Alberta Treasury Branch (ATB)",
		"Assiniboine Credit Union",
		"B2B (Formerly Laurentian Bank)",
		"Bridgewater Bank",
		"Canadiana Financial",
		"CFF BANK",
		"CMLS Financial",
		"Coast Capital Savings",
		"Credit Union Atlantic",
		"Envision Financial",
		"Equitable Trust",
		"First National Financial LP",
		"G and F Financial",
		"Home Trust",
		"ICICI",
		"MCAP",
		"Merix Financial",
		"National Bank of Canada",
		"Optimum mortgage",
		"Radius Financial",
		"RMG",
		"Scotia Mortgage Authority",
		"Servus Credit Union",
		"Street Capital",
		"TD Canada Trust",
		"Van City"
	],
	actions: {
		sendIncomplete: function() {
			let incompleteApplication = this.get("model");
			incompleteApplication.set("isIncomplete", true);
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.thank-you", application);
			});
		}
	}
});
