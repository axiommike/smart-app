import Ember from 'ember';

export default Ember.Component.extend({
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
	tagName: "liability-instance",
	classNameBindings: [":liability-instance", "liability.type"],
	liability: null,
	typeEditingDisabled: false
});
