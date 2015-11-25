import Ember from "ember";
import autosave from "ember-autosave";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "historical-employment",
	classNameBindings: ["employment.isCurrent", ":historical-employment", "needsNOA", "hasIncome", "notWorking"],
	attributeBindings: ["data-tenure"],
	"data-tenure": Ember.computed.alias("employment.tenureTotalYears"),
	employment: null,
	employmentProxy: autosave("employment"),
	durationEnabled: false,
	hasIncome: Ember.computed.gt("employment.income.value", 0),
	noaFilled: Ember.computed.notEmpty("noaValues"),
	needsNOA: Ember.computed.or("employment.isSelfEmployed", "employment.isCommission"),
	noaYears: 2,
	noaValues: Ember.computed("noaYears", function() {
		let noas = Ember.A(),
			lastYear = new Date().getFullYear() - 1;
		for (let year = 0; year < this.get("noaYears"); year++) {
			noas.pushObject({year: lastYear - year, value: null});
		}
		return noas;
	}),
	notWorking: Ember.computed.or("employment.isRetired", "employment.isOnPension", "employment.isStudent"),
	notPaid: Ember.computed.or("employment.isRetired", "employment.isStudent"),
	employmentTypes: [
		{label: "Full-Time", value: "full-time"},
		{label: "Part-Time", value: "part-time"},
		{label: "Self-Employed", value: "self-employed"},
		{label: "Pension", value: "pension"},
		{label: "Retired", value: "retired"},
		{label: "Other", value: "other"} /* Seasonal, etc. */
	],
	coApplicantEmploymentTypes: Ember.computed("employmentTypes", function() {
		let result = this.get("employmentTypes");
		result.splice(-1, 0, {label: "Student", value: "student"});
		return result;
	}),
	businessTypes: [
		{label: "Incorporated", value: "incorporated"},
		{label: "Partnership", value: "partnership"},
		{label: "Sole Proprietorship", value: "sole-propriety"}
	],
	paymentFrequencies: [
		{label: "Hourly", value: "hourly"},
		{label: "Salary", value: "salary"},
		{label: "Commission", value: "commission"},
		{label: "Commission + Salary", value: "commission-salary"},
		{label: "Commission + Hourly", value: "commission-hourly"}
	],
	onRemove: null,
	actions: {
		remove: function() {
			this.sendAction("onRemove", this.get("employment"));
		}
	}
});
