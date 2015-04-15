import Ember from "ember";

export default Ember.TextField.extend({
	type: "number",
	classNameBindings: [":currency-input"],
	attributeBindings: ["size"],
	size: Ember.computed.alias("value.length")
});
