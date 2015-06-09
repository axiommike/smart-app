import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	applicant: DS.belongsTo("applicant"),
	coApplicants: DS.hasMany("applicant"),
	applicants: Ember.computed("applicant", "coApplicants", function() {
		return Ember.makeArray(this.get("coApplicants").slice().concat(this.get("applicant")));
	}),
	liabilities: Ember.computed("applicants.@each.liabilities", function() {
		let combinedLiabilities = [], applicants = this.get("applicants");
		applicants.forEach((applicant) => {
			let applicantLiabilities = applicant.get("liabilities").toArray();
			combinedLiabilities.pushObjects(applicantLiabilities);
		});
		return combinedLiabilities;
	}),
	assets: Ember.computed("applicants.@each.assets", function() {
		let combinedAssets = [], applicants = this.get("applicants");
		applicants.forEach((applicant) => {
			let applicantAssets = applicant.get("assets").toArray();
			combinedAssets.pushObjects(applicantAssets);
		});
		return combinedAssets;
	}),
	income: Ember.computed("applicants.@each.income", function() {
		let combinedIncome = [], applicants = this.get("applicants");
		applicants.forEach((applicant) => {
			let applicantIncome = applicant.get("income").toArray();
			combinedIncome.pushObjects(applicantIncome);
		});
		return combinedIncome;
	}),
	applicantNames: Ember.computed.alias("applicants.@each.fullName"),
	dependents: Ember.computed.alias("applicants.@each.dependents"),
	hasDependents: Ember.computed.gt("dependentCount", 0),
	propertyValue: DS.attr("number", {defaultValue: 0}),
	downPaymentPercentage: Ember.computed("propertyValue", "downPayment", function() {
		if (this.get("downPayment") > this.get("propertyValue")) {
			return 1;
		}
		else if (this.get("downPayment") > 0 && this.get("propertyValue") > 0) {
			return this.get("downPayment") / this.get("propertyValue");
		}
		else {
			return 0;
		}
	}),
	type: DS.attr("string"),
	isPurchase: Ember.computed.equal("type", "purchase"),
	source: DS.attr("string"),
	isReferral: Ember.computed.equal("source", "agent"),
	isOther: Ember.computed.equal("source", "other"),
	referredByClient: Ember.computed.equal("source", "past-client"),
	referredBy: DS.attr("string"),
	downPayment: DS.attr("number"),
	referredByChanged: function() {
		if (!Ember.isBlank(this.get("referredBy"))) {
			this.set("comment", "Referred by " + this.get("referredBy") + ".\n\n");
		}
		else {
			this.set("comment", "");
		}
	}.observes("referredBy"),
	comment: DS.attr("string"),
	commentRows: Ember.computed("comment", function() {
		return this.get("comment") ? Math.floor(this.get("comment.length") * 0.015) + 1 : 1;
	}),
	isIncomplete: DS.attr("boolean", {defaultValue: false})
});
