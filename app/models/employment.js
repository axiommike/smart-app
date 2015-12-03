import DS from "ember-data";
import Ember from "ember";
import TimeableMixin from "../mixins/timeable";

export default DS.Model.extend(TimeableMixin, {
	type: DS.attr("string", {defaultValue: "full-time"}),
	employer: DS.belongsTo("company", {async: true}),
	updateDescription: function() {
		let description = "";
		const hasOccupation = !Ember.isBlank(this.get("occupation")),
			hasEmployer = !Ember.isBlank(this.get("employer.name"));
		if (hasOccupation) {
			description += this.get("occupation");
		}
		else {
			if (this.get("type")) {
				description += `${Ember.String.capitalize(this.get("type"))} Job`;
			}
			else {
				description = "Full-time Job"; // we have to hard-code the default, because of async behaviour
			}
		}
		if (hasEmployer) {
			description += ` at ${this.get("employer.name")}`;
		}
		this.get("income").then((resolvedIncome) => {
			if (resolvedIncome) {
				resolvedIncome.set("description", description);
			}
		});
	}.observes("employer.name", "occupation", "type"),
	occupation: DS.attr("string"),
	income: DS.belongsTo("income", {async: true}), /* Annual income ($) */
	incomeChanged: function() {
		if (this.get("isHourly")) {
			let hourlyRate = parseInt(this.get("hourlyRate")), weeklyHours = parseInt(this.get("weeklyHours"));
			if (hourlyRate && weeklyHours) {
				let yearlySalary = (hourlyRate * weeklyHours) * 52.1775; // there are 52.1775 weeks in a year
				this.get("income").then((resolvedIncome) => {
					resolvedIncome.set("value", yearlySalary);
				});
			}
		}
	}.observes("hourlyRate", "weeklyHours"),
	paymentFrequency: DS.attr("string", {defaultValue: "hourly"}),
	isSelfEmployed: Ember.computed.equal("type", "self-employed"),
	isRetired: Ember.computed.equal("type", "retired"),
	isOnPension: Ember.computed.equal("type", "pension"),
	isCurrent: DS.attr("boolean", {defaultValue: false}),
	isHourly: Ember.computed.equal("paymentFrequency", "hourly"),
	isSalaried: Ember.computed.equal("paymentFrequency", "salary"),
	isCommission: Ember.computed("paymentFrequency", function() {
		return this.get("paymentFrequency") === "commission" || this.get("paymentFrequency") === "commission-salary" || this.get("paymentFrequency") === "commission-hourly";
	}),
	isStudent: Ember.computed.equal("type", "student"),
	tenureMonths: DS.attr("number", {defaultValue: 0}),
	hourlyRate: DS.attr("number", {defaultValue: 0}),
	weeklyHours: DS.attr("number", {defaultValue: 0}),
	commission: DS.attr("number", {defaultValue: 0}),
	occupationType: DS.attr("string"),
	applicant: DS.belongsTo("applicant", {async: true})
});
