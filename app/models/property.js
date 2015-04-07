import DS from "ember-data";

export default DS.Model.extend({
	type: DS.attr("string"), /* Second home, rental, home residence */
	valueType: DS.attr("string"),
	ownership: DS.attr("string"),
	value: DS.attr("number", {defaultValue: 0}),
	applicant: DS.belongsTo("applicant"),
	isCurrent: DS.attr("boolean", {defaultValue: false}), /* That the house is currently being lived in by the applicant */
	propertyTaxes: DS.attr("number"), /* Annual property taxes on the building */
	isRental: Ember.computed.equal("type", "rental"),
	isPurchase: Ember.computed.not("isRental"), /* Did the applicant buy the house? */
	address: DS.belongsTo("address"),
	mortgage: DS.belongsTo("liability"),
	hasMortgage: DS.attr("boolean", {defaultValue: false}) /* Does the property have a mortgage liability? */
});
