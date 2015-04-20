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
	hasValidEmail: Ember.computed.match("email", /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i),
	phone: DS.attr("string"),
	workPhone: Ember.computed.alias("currentEmployment.firstObject.company.phone"),
	liabilities: DS.hasMany("liability"),
	assets: DS.hasMany("asset"),
	currentAddress: Ember.computed.alias("currentProperty.address"),
	previousAddresses: DS.hasMany("address"),
	addresses: Ember.computed("currentAddress", "previousAddresses", function() {
		return Ember.makeArray(this.get("previousAddresses").slice().concat(this.get("currentAddress")));
	}),
	totalAddressHistory: Ember.computed("address.@each.tenureTotalYears", function() {
		let addresses = this.get("addresses");
		return addresses.reduce(function(previousValue, address) {
			return previousValue + address.get("tenureTotalYears");
		}, 0);
	}),
	martialStatus: DS.attr("string"), /* Married, single, divorced */
	totalAssets: function() {
		let assets = this.get("assets");
		return assets.reduce(function(previousValue, asset) {
			return previousValue + asset.get("value");
		}, 0);
	}.property("assets.@each.value"),
	totalDebts: function() {
		let assets = this.get("liabilities");
		return assets.reduce(function(previousValue, liability) {
			return previousValue + liability.get("value");
		}, 0);
	}.property("liabilities.@each.value"),
	mortgages: Ember.computed.alias("properties.@each.mortgage"),
	properties: DS.hasMany("property", {async: true}),
	isPrimary: DS.attr("boolean"),
	relationship: DS.attr("string"), /* Spouse, parent, child (commonlaw), other */
	currentProperties: Ember.computed.filterBy("properties", "isCurrent", true),
	currentProperty: Ember.computed.alias("currentProperties.firstObject"),
	otherProperties: Ember.computed.filterBy("properties", "isCurrent", false)
});
