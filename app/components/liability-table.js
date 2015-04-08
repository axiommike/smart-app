import Ember from "ember";

export default Ember.Component.extend({
	liabilities: Ember.A(),
	type: null,
	filteredLiabilities: Ember.computed.filter("liabilities", function(liability) {
		return this.get("type") ? liability.get("type") === this.get("type") : true;
	}),
	hasLiabilities: Ember.computed.notEmpty("filteredLiabilities"),
	creditCardTypes: [
		{label: "VISA", value: "visa"},
		{label: "Mastercard", value: "mastercard"}
	],
	liabilityTypes: [
		{label: "Credit Card", value: "credit-card"},
		{label: "Line of Credit", value: "line-of-credit"},
		{label: "Personal Loan", value: "personal-loan"},
		{label: "Student Loan", value: "student-loan"},
		{label: "Secured Loan", value: "secured-loan"},
		{label: "Lease Agreement", value: "lease-agreement"},
		{label: "Rental", value: "rental"},
		{label: "Child Support", value: "child-support"},
		{label: "Auto Loan", value: "auto-loan"},
		{label: "Mortgage", value: "mortgage"}
	],
	actions: {
		addLiability: function() {
			let store = this.get("targetObject.store"), type = this.get("type"), liabilities = this.get("liabilities");
			let createdLiability = store.createRecord("liability");
			if (type) {
				createdLiability.set("type", type);
			}
			liabilities.pushObject(createdLiability);
		},
		removeLiability: function(liability) {
			return this.get("liabilities").removeObject(liability);
		}
	}
});
