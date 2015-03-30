import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	type: DS.attr("string"),
	employer: DS.belongsTo("company"),
	occupation: DS.attr("string"),
	income: DS.attr("number", {defaultValue: 0}),
	startDate: DS.attr("date", {defaultValue: new Date()}),
	tenure: DS.attr("number", {defaultValue: 0}), // in days
	tenureChanged: function() {
		let startDate = this.get("startDate"), endDate = this.get("endDate");
		if (startDate && endDate) {
			let differenceMS = Math.abs(startDate.getTime() - endDate.getTime());
			let updatedTenure =  Math.round(differenceMS/86400000); // 86400000 is one day
			this.set("tenure", updatedTenure);
		}
		else {
			this.set("tenure", null)
		}
	}.observes("startDate", "endDate"),
	isCurrent: DS.attr("boolean", {defaultValue: false}),
	tenureMonths: Ember.computed("tenure", function() {
		return Math.round(this.get("tenure") / 30);
	}),
	hourlyRate: DS.attr("number", {defaultValue: 0}),
	weeklyHours: DS.attr("number", {defaultValue: 0}),
	commission: DS.attr("number", {defaultValue: 0}),
	occupationType: DS.attr("string")
});
