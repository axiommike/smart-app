import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	type: DS.attr("string"), /* Second home, rental, home residence */
	valueType: DS.attr("string"),
	ownership: DS.attr("string"),
	value: DS.attr("number", {defaultValue: 0}),
	applicant: DS.belongsTo("applicant"),
	isCurrent: DS.attr("boolean", {defaultValue: false}), /* That the house is currently being lived in by the applicant */
	propertyTaxes: DS.attr("number"), /* Monthly property taxes on the building */
	propertyTaxesAnnual: Ember.computed("propertyTaxes", function() {
		return parseInt(this.get("propertyTaxes")) * 12;
	}),
	isRental: DS.attr("boolean", {defaultValue: false}),
	rentalIncome: DS.attr("number"),
	isPurchase: Ember.computed.not("isRental"), /* Did the applicant buy the house? */
	address: DS.belongsTo("address"),
	mortgage: DS.belongsTo("liability")
});
