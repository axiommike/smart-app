import Ember from "ember";
import DS from "ember-data";

export default Ember.Mixin.create({
	isCurrent: DS.attr("boolean", {defaultValue: false}),
	startDate: DS.attr("date", {defaultValue: new Date()}),
	endDate: DS.attr("date", {defaultValue: new Date()}),
	tenure: DS.attr("number", {defaultValue: 0}), /* Total months in tenure */
	tenureTotalYears: Ember.computed("tenure", function() {
		return Math.floor(this.get("tenure") / 12);
	}),
	tenureYears: DS.attr("number", {defaultValue: 0}), // in years
	tenureDays: Ember.computed("tenure", function() {
		return Math.floor(this.get("tenure") * 365);
	}),
	tenureChanged: function() {
		console.log("Tenure changed");
		let years = parseInt(this.get("tenureYears")), months = parseInt(this.get("tenureMonths"));
		if (years && months) {
			this.set("tenure", Math.round(months + (years * 12)));
		}
		else if (years) {
			this.set("tenure", years * 12);
		}
		else if (months) {
			this.set("tenure", months);
		}
	}.observes("tenureMonths", "tenureYears"),
	tenureDatesChanged: function() {
		let startDate = this.get("startDate"), endDate = this.get("endDate");
		if (startDate && endDate) {
			let differenceMS = Math.abs(startDate.getTime() - endDate.getTime());
			let updatedTenure =  Math.round(differenceMS/86400000); // 86400000 is one day
			this.set("tenure", updatedTenure);
		}
	}.observes("startDate", "endDate")
});
