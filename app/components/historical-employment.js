import Ember from 'ember';

export default Ember.Component.extend({
	employment: null,
	durationEnabled: false,
	employmentTypes: [
		{label: "Full-Time", value: "full-time"},
		{label: "Part-Time", value: "part-time"},
		{label: "Other", value: "other"} /* Seasonal, etc. */
	],
	incomeTypes: [
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
