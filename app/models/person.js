import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	title: DS.attr("string"),
	firstName: DS.attr("string"),
	middleName: DS.attr("string"),
	lastName: DS.attr("string"),
	names: Ember.computed.collect("firstName", "lastName", "middleName"),
	hasName: Ember.computed.empty("names"),
	fullName: Ember.computed("names", function() {
		return Ember.makeArray(this.get("names")).join(" ")
	}),
	/*type: DS.attr("string"),*/
	birthDate: DS.attr("date"),
	sin: DS.attr("number"),
	employment: DS.hasMany("employment"),
	currentEmployment: Ember.computed.filterBy("employment", "isCurrent", true),
	email: DS.attr("string"),
	slogan: DS.attr("string"),
	biography: DS.attr("string"),
	facebookURL: DS.attr("string"),
	twitterURL: DS.attr("string"),
	linkedInURL: DS.attr("string"),
	blogURL: DS.attr("string"),
	ceridianID: DS.attr("number"),
	phone: DS.attr("number"),
	workPhone: Ember.computed.alias("currentEmployment.@each.company.phone")
});
