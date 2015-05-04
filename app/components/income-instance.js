import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	incomeSources: [
		"Investment",
		"Child Support Alimony",
		"Property Rental",
		"Pension",
		"Other"
	],
	pensionTypes: [
		"Canada Pension Plan (CPP)",
		"Old Age Security",
		"Work Pension",
		"Other"
	],
	frequencies: [
		"Yearly",
		"Monthly"
	],
	pensionType: null,
	income: null,
	flatList: false,
	isChildSupport: Ember.computed.equal("income.source", "Child Support Alimony"),
	isInvestment: Ember.computed.equal("income.source", "Investment"),
	isPension: Ember.computed.equal("income.source", "Pension"),
	isPropertyRental: Ember.computed.equal("income.source", "Property Rental"),
	isOther: Ember.computed.equal("income.source", "Other")
});
