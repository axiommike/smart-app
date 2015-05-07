import DS from "ember-data";
import Ember from "ember";
import TimeableMixin from "../mixins/timeable";

export default DS.Model.extend(TimeableMixin, {
	type: DS.attr("string"), /* Second home, rental, home residence */
	valueType: DS.attr("string"),
	ownership: DS.attr("string"),
	asset: DS.belongsTo("asset"),
	value: Ember.computed.alias("asset.value"), /* Included in total assets */
	applicant: DS.belongsTo("applicant", {async: true}),
	propertyTaxes: DS.attr("number"), /* Monthly property taxes on the building */
	propertyTaxesAnnual: Ember.computed("propertyTaxes", function() {
		return parseInt(this.get("propertyTaxes")) * 12;
	}),
	isRental: DS.attr("boolean", {defaultValue: false}),
	rentalIncome: DS.attr("number"), /* Included in total income */
	isPurchase: Ember.computed.not("isRental"), /* Did the applicant buy the house? */
	address: DS.belongsTo("address"),
	mortgage: DS.belongsTo("liability"),
	lineOfCredit: DS.belongsTo("liability")
});
