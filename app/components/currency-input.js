import Ember from "ember";

export default Ember.TextField.extend({
	type: "number",
	placeholder: "$.$",
	step: "any",
	min: 0,
	classNameBindings: [":currency-input"],
	attributeBindings: ["size"],
	size: Ember.computed.alias("value.length")
});
