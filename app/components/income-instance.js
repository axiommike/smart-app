import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "income-instance",
	classNameBindings: [":income-instance"],
	incomeSources: [
		"Investment",
		"employment",
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
	showApplicant: false,
	pensionType: null,
	income: null,
	onRemove: null,
	flatList: false,
	descriptionSize: Ember.computed("income.description.length", function() {
		return this.get("income.description.length") > 0 ? this.get("income.description.length") : 1;
	}),
	isChildSupport: Ember.computed.equal("income.source", "Child Support Alimony"),
	isInvestment: Ember.computed.equal("income.source", "Investment"),
	isPension: Ember.computed.equal("income.source", "Pension"),
	isEmployment: Ember.computed.equal("income.source", "employment"),
	isPropertyRental: Ember.computed.equal("income.source", "Property Rental"),
	isOther: Ember.computed.equal("income.source", "Other"),
	actions: {
		remove: function() {
			this.sendAction("onRemove", this.get("income"));
		}
	}
});
