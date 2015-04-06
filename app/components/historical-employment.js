import Ember from 'ember';

export default Ember.Component.extend({
	employment: null,
	durationEnabled: false,
	employmentTypes: [
		{label: "Full-Time", value: "full-time"},
		{label: "Part-Time", value: "part-time"},
		{label: "Self-Employed", value: "self-employed"}
	],
	onRemove: null,
	actions: {
		remove: function() {
			this.sendAction("onRemove", this.get("employment"));
		}
	}
});
