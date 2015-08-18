import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	properties: Ember.A(), /* Should resolve to the list of all added properties */
	creditCardTypes: [
		{label: "VISA", value: "visa"},
		{label: "Mastercard", value: "mastercard"},
		{label: "Amex", value: "amex"},
		{label: "Store Card", value: "store card"},
		{label: "Other", value: "other"}
	],
	liabilityTypes: [
		{label: "Credit Card", value: "credit-card"},
		{label: "Personal Line of Credit", value: "line-of-credit"},
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
	showApplicant: false,
	liability: null,
	paymentLabel: Ember.computed("liability.paymentFrequency", function() {
		return Ember.String.capitalize(this.get("liability.paymentFrequency")) + " Payment";
	}),
	typeEditingDisabled: false,
	onRemove: null,
	actions: {
		remove: function() {
			this.sendAction("onRemove", this.get("liability"));
		}
	}
});
