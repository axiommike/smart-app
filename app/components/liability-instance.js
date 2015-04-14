import Ember from 'ember';

export default Ember.Component.extend({
	creditCardTypes: [
		{label: "VISA", value: "visa"},
		{label: "Mastercard", value: "mastercard"}
	],
	liabilityTypes: [
		{label: "Credit Card", value: "credit-card"},
		{label: "Line of Credit", value: "line-of-credit"},
		{label: "Loan", value: "loan"},
		{label: "Auto Loan", value: "auto-loan"},
		{label: "Child Support or Maintenance Payments", value: "child-support"},
		{label: "Mortgage", value: "mortgage"},
		{label: "Other", value: "other"}
	],
	loanTypes: [
		"Personal Loan or Consolidation Loan",
		"Student Loan"
	],
	paymentFrequencies: [
		"Monthly",
		"Semi-Monthly",
		"Weekly",
		"Bi-Weekly",
		"Bi-Weekly Accelerated",
		"Bi-Monthly Accelerated"
	],
	tagName: "liability-instance",
	classNameBindings: [":liability-instance", "liability.type"],
	liability: null,
	typeEditingDisabled: false
});
