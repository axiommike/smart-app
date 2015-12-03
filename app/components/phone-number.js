import Ember from "ember";

export default Ember.Component.extend({
	number: null,
	plainNumber: Ember.computed("number", function() {
		if (this.get("hasNumber")) {
			return this.get("number").replace(/\D+/g, "");
		}
	}),
	title: Ember.computed("number", function() {
		return `Call ${this.get("number")}`;
	}),
	hasNumber: Ember.computed.notEmpty("number"),
	hasFullNumber: Ember.computed.gt("plainNumber", 8),
	isTollFree: Ember.computed.match("plainNumber", /^(\+?1)?(8(00|44|55|66|77|88))/),
	countryCode: Ember.computed("plainNumber", function() {
		let firstNumber = this.get("plainNumber").substr(0, 1);
		if (firstNumber === "1") {
			return firstNumber;
		}
	}),
	hasCountryCode: Ember.computed.notEmpty("countryCode"),
	areaCode: Ember.computed("plainNumber", "countryCode", function() {
		if (this.get("plainNumber.length") > 3) {
			let startingPoint = this.get("countryCode") ? this.get("countryCode.length") : 0;
			return this.get("plainNumber").substr(startingPoint, 3);
		}
	}),
	hasAreaCode: Ember.computed.gte("areaCode", 3),
	centralOfficeCode: Ember.computed("plainNumber", "areaCode", function() { /* The first 3 numbers - excluding area code */
		if (this.get("plainNumber.length") >= 6) {
			let startingPoint = this.get("areaCode.length") + (this.get("hasCountryCode") ? this.get("countryCode.length") : 0);
			return this.get("plainNumber").substr(startingPoint, 3);
		}
	}),
	hasCentralOfficeCode: Ember.computed.gte("centralOfficeCode", 3),
	serviceCode: Ember.computed("plainNumber", function() { /* the last 4 numbers */
		if (this.get("plainNumber.length") > 7) {
			return this.get("plainNumber").slice(-4);
		}
	}),
	hasServiceCode: Ember.computed.gte("serviceCode", 4),
	extension: Ember.computed("plainNumber", function() {
		// todo: match against extension
	}),
	numberParts: Ember.computed.collect("countryCode", "areaCode", "centralOfficeCode", "serviceCode"),
	formattedNumber: Ember.computed("numberParts", function() {
		return this.get("numberParts").compact().join("-");
	}),
	tagName: "a",
	classNameBindings: [":phone-number", "hasNumber", "isTollFree"],
	attributeBindings: ["href", "title"],
	href: Ember.computed("plainNumber", function() {
		if (this.get("hasNumber")) {
			return `tel:${this.get("plainNumber")}`;
		}
	})
});
