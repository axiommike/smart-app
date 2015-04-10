import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	applicant: DS.belongsTo("applicant"),
	coApplicants: DS.hasMany("applicant"),
	applicants: Ember.computed("applicant", "coApplicants", function() {
		return Ember.makeArray(this.get("coApplicants").slice().concat(this.get("applicant")));
	}),
	applicantNames: Ember.computed.alias("applicants.@each.fullName"),
	type: DS.attr("string"),
	source: DS.attr("string"),
	comment: DS.attr("string"),
	isIncomplete: DS.attr("boolean", {defaultValue: false})
});
