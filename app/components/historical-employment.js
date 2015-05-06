import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "historical-employment",
	classNameBindings: ["employment.isCurrent", ":historical-employment"],
	attributeBindings: ["data-tenure"],
	"data-tenure": Ember.computed.alias("employment.tenureTotalYears"),
	employment: null,
	durationEnabled: false,
	employmentTypes: [
		{label: "Full-Time", value: "full-time"},
		{label: "Part-Time", value: "part-time"},
		{label: "Self-Employed", value: "self-employed"},
		{label: "Pension", value: "pension"},
		{label: "Other", value: "other"} /* Seasonal, etc. */
	],
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
