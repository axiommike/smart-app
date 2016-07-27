import Ember from "ember";
import autosave from "ember-autosave";

export default Ember.Controller.extend({
	application: autosave("model"),
	applicant: autosave("model.applicant"),
	sourceTypes: [
		{value: "friend", label: "Friend"},
		{value: "agent", label: "Realtor"},
		{value: "past-client", label: "I'm a past client"},
		{value: "search", label: "Online search"},
		{value: "website", label: "Advertising"},
		{value: "other", label: "Other"}
	],
	goals: [
		{value: "purchase", label: "Purchase a property"},
		{value: "refinance", label: "Refinance my mortgage"},
		{value: "renewal", label: "Renew my mortgage"},
		{value: "rental", label: "Buy a rental property"},
		{value: "advice", label: "Get some advice"}
	],
	downPaymentSources: [
		{value: "property sale", label: "Sale of Existing Property"},
		{value: "cash savings", label: "Personal Cash / Savings"},
		{value: "rrsp", label: "RRSP"},
		{value: "gift", label: "Gift"},
		{value: "grant", label: "Grant"},
		{value: "inheritance", label: "Inheritance"},
		{value: "borrowed", label: "Borrowed from Friend / Family"},
		{value: "liquid assets", label: "Borrowed Against Liquid Assets"},
		{value: "sweat equity", label: "Sweat Equity"},
		{value: "existing equity", label: "Existing Equity"},
		{value: "secondary financing", label: "Secondary Financing"},
		{value: "investment", label: "Investments"},
		{value: "other", label: "Other..."}
	],
	mortgageYears: 40,
	mortgageTerms: Ember.computed("mortgageYears", function() {
		let terms = [];
		for (let i = 1; i <= 40; i++) {
			terms.push({
				label: `${i} Years`,
				value: i
			});
		}
		return terms;
	}),
	actions: {
		sendIncomplete: function() {
			var model = this.get("model"), applicant = model.get("applicant");
			model.save().then((savedApplication) => {
				applicant.save().then((savedApplicant) => {
					this.transitionToRoute("mortgage-application.thank-you", savedApplication);
				});
			});
		},
		nextStep: function() {
			var model = this.get("model"), applicant = model.get("applicant");
			model.save().then((savedApplication) => {
				applicant.save().then((savedApplicant) => {
					this.transitionToRoute("mortgage-application.applicants", savedApplication);
				});
			});
		}
	}
});
