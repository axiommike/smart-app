import Ember from "ember";

export default Ember.Component.extend({
	number: null,
	plainNumber: Ember.computed("number", function() {
		if (this.get("hasNumber")) {
			return this.get("number").replace(/\D+/g, "");
		}
	}),
	hasNumber: Ember.computed("number", function() {
		let number = this.get("number");
		return (!Ember.isBlank(number) && (number.length > 9));
	}),
	areaCode: Ember.computed("plainNumber", function() {
		if (this.get("plainNumber.length") > 3) {
			return this.get("plainNumber").substr(0, 3);
		}
	}),
	centralOfficeCode: Ember.computed("plainNumber", function() { /* The first 3 numbers - excluding area code */
		if (this.get("plainNumber.length") > 6) {
			return this.get("plainNumber").substr(3, 3);
		}
	}),
	serviceCode: Ember.computed("plainNumber", function() { /* the last 4 numbers */
		if (this.get("plainNumber.length") > 8) {
			return this.get("plainNumber").substr(6, 4);
		}
	}),
	extension: Ember.computed("plainNumber", function() {
		// todo: match against extension
	}),
	tagName: "a",
	classNameBindings: [":phone-number", "hasNumber"],
	attributeBindings: ["href"],
	formattedNumber: Ember.computed("plainNumber", function() {
		let num = this.get("plainNumber");
		if (this.get("hasNumber")) {
			return "(" + num.substr(0, 3) + ") " + num.substr(3, 3) + "-" + num.substr(6, 4);
		}
	}),
	href: Ember.computed("plainNumber", function() {
		if (this.get("hasNumber")) {
			return `tel:${this.get("plainNumber")}`;
		}
	})
});
