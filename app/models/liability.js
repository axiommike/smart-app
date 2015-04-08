import DS from "ember-data";

export default DS.Model.extend({
	type: DS.attr("string"), /* Mortgage, Student loan, auto loan, line of credit, child support, credit card */
	lender: DS.attr("string"),
	rate: DS.attr("number"),
	maturityDate: DS.attr("date"),
	payment: DS.attr("number", {defaultValue: 0}), /* Monthly payment for mortgage; estimated payment if credit card */
	outstandingBalance: DS.attr("number", {defaultValue: 0}),
	isCreditCard: Ember.computed.equal("type", "credit-card"),
	isAutoLoan: Ember.computed.equal("type", "auto-loan"),
	isLineOfCredit: Ember.computed.equal("type", "line-of-credit"),
	isMortgage: Ember.computed.equal("type", "mortgage"),
	creditLimit: DS.attr("number"),
	creditCardType: DS.attr("string"), /* Bank name/Visa/mastercard */
	willBePaidOff: DS.attr("boolean"),
	isRepaying: DS.attr("boolean", {defaultValue: false}),
	applicant: DS.belongsTo("applicant")
});
