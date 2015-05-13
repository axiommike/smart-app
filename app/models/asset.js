import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	type: DS.attr("string"),
	isPersonalItem: Ember.computed.equal("type", "item"),
	isSavings: Ember.computed.equal("type", "savings"),
	isInvestment: Ember.computed.equal("type", "investment"),
	isProperty: Ember.computed.equal("type", "property"),
	isGIC: Ember.computed.equal("type", "gic"),
	isRRSP: Ember.computed.equal("type", "rrsp"),
	isVehicle: Ember.computed.equal("type", "vehicle"),
	isOther: Ember.computed.equal("type", "other"),
	description: DS.attr("string"), /* Primarily used for "other" type */
	valueType: DS.attr("string"),
	bank: DS.attr("string"),
	ownership: DS.attr("string"),
	value: DS.attr("number", {defaultValue: 0}),
	applicant: DS.belongsTo("applicant")
});
