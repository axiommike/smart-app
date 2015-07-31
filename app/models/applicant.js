import DS from "ember-data";
import Ember from "ember";
import PersonableMixin from "../mixins/personable";

export default DS.Model.extend(PersonableMixin, {
	dependents: DS.attr("number", {defaultValue: 0}),
	birthDate: DS.attr("date"),
	sin: DS.attr("number"),
	employment: DS.hasMany("employment", {async: true}),
	currentEmployment: Ember.computed.filterBy("employment", "isCurrent", true),
	previousEmployment: Ember.computed.setDiff("employment", "currentEmployment"),
	liabilities: DS.hasMany("liability", {async: true}),
	vehicleLoans: Ember.computed.alias("vehicles.@each.loan"),
	childSupportLiabilities: Ember.computed.filterBy("liabilities", "type", "child-support"),
	creditCardLiabilities: Ember.computed.filterBy("liabilities", "type", "credit-card"),
	lineOfCreditLiabilities: Ember.computed.filterBy("liabilities", "type", "line-of-credit"),
	loanLiabilities: Ember.computed.filterBy("liabilities", "type", "loan"),
	otherLiabilities: Ember.computed.filterBy("liabilities", "type", "other"),
	allAssets: Ember.computed.uniq("assets", "vehicles.@each.asset", "properties.@each.asset"),
	assets: DS.hasMany("asset", {async: true}),
	vehicles: DS.hasMany("vehicle", {async: true}),
	vehicleAssets: Ember.computed.alias("vehicles.@each.asset"),
	personalItemAssets: Ember.computed.filterBy("assets", "type", "item"),
	savingsAssets: Ember.computed.filterBy("assets", "type", "savings"),
	investmentAssets: Ember.computed.filterBy("assets", "type", "investment"),
	gicAssets: Ember.computed.filterBy("assets", "type", "gic"),
	rrspAssets: Ember.computed.filterBy("assets", "type", "rrsp"),
	otherAssets: Ember.computed.filterBy("assets", "type", "other"),
	income: DS.hasMany("income", {async: true}),
	employmentIncome: Ember.computed.filterBy("income", "source", "employment"),
	extraIncome: Ember.computed.setDiff("income", "employmentIncome"),
	totalIncome: Ember.computed("income.@each.value", function() {
		let incomes = this.get("income");
		return incomes.reduce(function(previousValue, income) {
			return previousValue + parseInt(income.get("yearlyValue"));
		}, 0);
	}),
	currentAddress: Ember.computed.alias("currentProperty.address"),
	previousAddresses: DS.hasMany("address", {async: true}),
	addresses: Ember.computed("currentAddress", "previousAddresses", function() {
		return Ember.makeArray(this.get("previousAddresses").slice().concat(this.get("currentAddress")));
	}),
	totalAddressHistory: Ember.computed("address.@each.tenureTotalYears", function() {
		let addresses = this.get("addresses");
		return addresses.reduce(function(previousValue, address) {
			return parseInt(previousValue) + (address ? address.get("tenureTotalYears") : 0);
		}, 0);
	}),
	maritalStatus: DS.attr("string"), /* Married, single, divorced */
	totalAssets: function() {
		let assets = this.get("assets");
		return assets.reduce(function(previousValue, asset) {
			return parseInt(previousValue) + (asset ? asset.get("value") : 0);
		}, 0);
	}.property("assets.@each.value"),
	totalLiabilities: function() { /* Total Yearly liabilities */
		let liabilities = this.get("liabilities");
		return liabilities.reduce(function(previousValue, liability) {
			return parseInt(previousValue) + (liability ? liability.get("payment") : 0);
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
