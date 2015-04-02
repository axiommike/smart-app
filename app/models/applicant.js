import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	title: DS.attr("string"),
	firstName: DS.attr("string"),
	middleName: DS.attr("string"),
	lastName: DS.attr("string"),
	names: Ember.computed.collect("firstName", "lastName", "middleName"),
	hasName: Ember.computed.notEmpty("names"),
	fullName: Ember.computed("names", function() {
		return Ember.makeArray(this.get("names")).slice().concat().join(" ");
	}),
	/*type: DS.attr("string"),*/
	birthDate: DS.attr("date"),
	sin: DS.attr("number"),
	employment: DS.hasMany("employment"),
	currentEmployment: Ember.computed.filterBy("employment", "isCurrent", true),
	email: DS.attr("string"),
	phone: DS.attr("string"),
	workPhone: Ember.computed.alias("currentEmployment.firstObject.company.phone"),
	liabilities: DS.hasMany("liability"),
	assets: DS.hasMany("asset"),
	totalAssets: function() {
		let assets = this.get("assets");
		return assets.reduce(function(previousValue, asset) {
			return previousValue + asset.get("value");
		}, 0);
	}.property("assets.@each.value"),
	debt: DS.attr("number", {defaultValue: 0}),
	properties: DS.hasMany("property"),
	isPrimary: DS.attr("boolean"),
	currentProperty: Ember.computed.filterBy("properties", "isCurrent", true)
});
