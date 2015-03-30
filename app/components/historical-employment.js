import Ember from 'ember';

export default Ember.Component.extend({
	employment: null,
	type: Ember.computed.alias("employment.type"),
	employer: Ember.computed.alias("employment.employer"),
	occupation: Ember.computed.alias("employment.occupation"),
	income: Ember.computed.alias("employment.income"),
	startDate: Ember.computed.alias("employment.startDate"),
	tenure: Ember.computed.alias("employment.tenure"), // in days
	isCurrent: Ember.computed.alias("employment.isCurrent"),
	tenureMonths: Ember.computed.alias("employment.tenureMonths"),
	hourlyRate: Ember.computed.alias("employment.hourlyRate"),
	weeklyHours: Ember.computed.alias("employment.weeklyHours"),
	commission: Ember.computed.alias("employment.commission"),
	occupationType: Ember.computed.alias("employment.occupationType"),
	employmentTypes: [
		{label: "Full-Time", value: "full-time"},
		{label: "Part-Time", value: "part-time"},
		{label: "Self-Employed", value: "self-employed"}
	]
});
