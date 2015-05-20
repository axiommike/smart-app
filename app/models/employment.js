import DS from "ember-data";
import Ember from "ember";
import TimeableMixin from "../mixins/timeable";

export default DS.Model.extend(TimeableMixin, {
	type: DS.attr("string"),
	employer: DS.belongsTo("company"),
	occupation: DS.attr("string"),
	income: DS.belongsTo("income"), /* Annual income ($) */
	incomeChanged: function() {
		if (this.get("isHourly")) {
			let hourlyRate = parseInt(this.get("hourlyRate")), weeklyHours = parseInt(this.get("weeklyHours"));
			if (hourlyRate && weeklyHours) {
				let yearlySalary = (hourlyRate * weeklyHours) * 52.1775; // there are 52.1775 weeks in a year
				this.set("income.value", yearlySalary);
			}
		}
	}.observes("hourlyRate", "weeklyHours"),
	paymentFrequency: DS.attr("string"),
	isSelfEmployed: Ember.computed.equal("type", "self-employed"),
	isCurrent: DS.attr("boolean", {defaultValue: false}),
	isHourly: Ember.computed.equal("paymentFrequency", "hourly"),
	isSalaried: Ember.computed.equal("paymentFrequency", "salary"),
	isCommission: Ember.computed("paymentFrequency", function() {
		return this.get("paymentFrequency") === "commission" || this.get("paymentFrequency") === "commission-salary" || this.get("paymentFrequency") === "commission-hourly";
	}),
	tenureMonths: DS.attr("number", {defaultValue: 0}),
	hourlyRate: DS.attr("number", {defaultValue: 0}),
	weeklyHours: DS.attr("number", {defaultValue: 0}),
	commission: DS.attr("number", {defaultValue: 0}),
	occupationType: DS.attr("string"),
	applicant: DS.belongsTo("applicant")
});
