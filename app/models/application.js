import DS from "ember-data";

export default DS.Model.extend({
	applicant: DS.belongsTo("applicant"),
	coApplicants: DS.hasMany("applicant"),
	applicants: Ember.computed("applicant", "coApplicants", function() {
		return Ember.makeArray(this.get("coApplicants").slice().concat(this.get("applicant")));
	}),
	applicantNames: Ember.computed.alias("applicants.@each.fullName")
});
