import Ember from "ember";

export default Ember.Component.extend({
	number: null,
	hasNumber: Ember.computed("number", function() {
		let number = this.get("number");
		return (!Ember.isBlank(number) && (number.length > 9));
	}),
	areaCode: Ember.computed("number", function() {
		if (this.get("number.length") > 3) {
			return this.get("num").substr(0, 3);
		}
	}),
	centralOfficeCode: Ember.computed("number", function() { /* The first 3 numbers - excluding area code */

	}),
	serviceCode: Ember.computed("number", function() { /* the last 4 numbers */
		if (this.get("number.length") > 8) {
			return this.get("number").substr(6, 4);
		}
	}),
	extension: Ember.computed("number", function() {
		// todo: match against extension
	}),
	tagName: "a",
	classNameBindings: [":phone-number", "hasNumber"],
	attributeBindings: ["href"],
	formattedNumber: Ember.computed("number", function() {
		let num = this.get("number");
		if (this.get("hasNumber")) {
			return "(" + num.substr(0, 3) + ") " + num.substr(3, 3) + "-" + num.substr(6, 4);
		}

	}),
	href: Ember.computed("number", function() {
		if (this.get("hasNumber")) {
			return `tel:${this.get("number")}`;
		}
	})
});
