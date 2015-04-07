import DS from "ember-data";

export default DS.Model.extend({
	type: DS.attr("string"), /* Mortgage, Student loan, auto loan, line of credit, child support, credit card */
	lender: DS.attr("string"),
	rate: DS.attr("number"),
	maturityDate: DS.attr("date"),
	payment: DS.attr("number", {defaultValue: 0}),
	outstandingBalance: DS.attr("number", {defaultValue: 0}),
	isCreditCard: Ember.computed.equal("type", "credit-card"),
	isAutoLoan: Ember.computed.equal("type", "auto-loan"),
	isLineOfCredit: Ember.computed.equal("type", "line-of-credit"),
	creditLimit: DS.attr("number"),
	creditCardType: DS.attr("string"),
	willBePaidOff: DS.attr("boolean"),
	isRepaying: DS.attr("boolean", {defaultValue: false})
});
