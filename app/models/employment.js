import DS from "ember-data";
import Ember from "ember";
import TimeableMixin from "../mixins/timeable";

export default DS.Model.extend(TimeableMixin, {
	type: DS.attr("string"),
	employer: DS.belongsTo("company"),
	occupation: DS.attr("string"),
	income: DS.attr("number", {defaultValue: 0}), /* Annual income ($) */
	incomeChanged: function() {
		let hourlyRate = parseInt(this.get("hourlyRate")), weeklyHours = parseInt(this.get("weeklyHours"));
		if (hourlyRate && weeklyHours) {
			let yearlySalary = (hourlyRate * weeklyHours) * 52.1775; // there are 52.1775 weeks in a year
			this.set("income", yearlySalary);
		}
	}.observes("hourlyRate", "weeklyHours"),
	incomeType: DS.attr("string"),
	isSelfEmployed: Ember.computed.equal("type", "self-employed"),
	isCurrent: DS.attr("boolean", {defaultValue: false}),
	isHourly: Ember.computed.equal("incomeType", "hourly"),
	isSalaried: Ember.computed("incomeType", function() {
		return this.get("incomeType") === "salary" || this.get("incomeType") === "hourly";
	}),
	isCommission: Ember.computed("incomeType", function() {
		return this.get("incomeType") === "commission" || this.get("incomeType") === "commission-salary" || this.get("incomeType") === "commission-hourly";
	}),
	tenureMonths: DS.attr("number", {defaultValue: 0}),
	hourlyRate: DS.attr("number", {defaultValue: 0}),
	weeklyHours: DS.attr("number", {defaultValue: 0}),
	commission: DS.attr("number", {defaultValue: 0}),
	occupationType: DS.attr("string")
});
