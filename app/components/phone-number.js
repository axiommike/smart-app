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
	hasNumber: Ember.computed("number", function() {
		let number = this.get("number");
		return (!Ember.isBlank(number) && (number.length > 9));
	}),
	isTollFree: Ember.computed.match("plainNumber", /^(\+?1)?(8(00|44|55|66|77|88))/),
	countryCode: Ember.computed("plainNumber", function() {
		let firstNumber = this.get("plainNumber").substr(0, 1);
		if (firstNumber === "1") {
			return firstNumber;
		}
	}),
	areaCode: Ember.computed("plainNumber", "countryCode", function() {
		if (this.get("plainNumber.length") > 3) {
			let startingPoint = this.get("countryCode") ? this.get("countryCode.length") : 0;
			return this.get("plainNumber").substr(startingPoint, 3);
		}
	}),
	centralOfficeCode: Ember.computed("plainNumber", "areaCode", function() { /* The first 3 numbers - excluding area code */
		if (this.get("plainNumber.length") > 6) {
			let startingPoint = this.get("areaCode.length") + (this.get("countryCode.length"));
			return this.get("plainNumber").substr(startingPoint, 3);
		}
	}),
	serviceCode: Ember.computed("plainNumber", function() { /* the last 4 numbers */
		if (this.get("plainNumber.length") > 8) {
			return this.get("plainNumber").slice(-4);
		}
	}),
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
