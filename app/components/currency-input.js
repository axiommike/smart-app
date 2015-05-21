import Ember from "ember";

export default Ember.TextField.extend({
	type: "number",
	placeholder: "$.$",
	step: "any",
	min: 0,
	classNameBindings: [":currency-input"],
	attributeBindings: ["size"],
	size: Ember.computed("address.address", function() {
		return this.get("value.length") > 0 ? this.get("value.length") : 1;
	})
});
