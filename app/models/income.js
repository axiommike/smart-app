import DS from "ember-data";

export default DS.Model.extend({
	source: DS.attr("string"), /* child support alimony, rental property, investment, other */
	isOther: Ember.computed.equal("source", "other"),
	isRental: Ember.computed.equal("source", "property"),
	isInvestment: Ember.computed.equal("source", "investment"),
	value: DS.attr("number", {defaultValue: 0}), /* In dollars */
	frequency: DS.attr("string", {defaultValue: "Yearly"}), /* Monthly, yearly */
	description: DS.attr("string"),
	isMonthly: Ember.computed.equal("frequency", "Monthly"),
	isYearly: Ember.computed.equal("frequency", "Yearly"),
	yearlyValue: Ember.computed("value", "frequency", function() {
		switch (this.get("frequency")) {
			case "Yearly":
				return this.get("value");
			case "Monthly":
				return this.get("value") * 12;
		}
	}),
	monthlyValue: Ember.computed("value", "frequency", function() {
		switch (this.get("frequency")) {
			case "Yearly":
				return this.get("value") / 12;
			case "Monthly":
				return this.get("value");
		}
	}),
	applicant: DS.belongsTo("applicant")
});
