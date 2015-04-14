import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	type: DS.attr("string"), /* Mortgage, Student loan, auto loan, line of credit, child support, credit card */
	description: DS.attr("string"),
	lender: DS.attr("string"),
	rate: DS.attr("number"),
	maturityDate: DS.attr("date"),
	payment: DS.attr("number", {defaultValue: 0}), /* Monthly payment for mortgage; estimated payment if credit card */
	paymentFrequency: DS.attr("string", {defaultValue: "Monthly"}),
	outstandingBalance: DS.attr("number", {defaultValue: 0}),
	isCreditCard: Ember.computed.equal("type", "credit-card"),
	isStudentLoan: Ember.computed.equal("description", "Student Loan"),
	isPersonalLoan: Ember.computed.equal("description", "Personal Loan"),
	isLoan: Ember.computed.equal("type", "loan"), /* When you choose between personal loan and student */
	isOther: Ember.computed.equal("type", "other"),
	isAutoLoan: Ember.computed.equal("type", "auto-loan"),
	isLineOfCredit: Ember.computed.equal("type", "line-of-credit"),
	isMortgage: Ember.computed.equal("type", "mortgage"),
	isChildSupport: Ember.computed.equal("type", "child-support"),
	creditCardType: DS.attr("string"), /* Bank name/Visa/mastercard */
	willBePaidOff: DS.attr("boolean"),
	isRepaying: DS.attr("boolean", {defaultValue: false})
});
