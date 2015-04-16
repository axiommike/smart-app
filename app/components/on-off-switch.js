import Ember from "ember";

export default Ember.Checkbox.extend({
	classNameBindings: [":on-off-switch", "checked"],
	attributeBindings: ["onMessage", "offMessage"],
	onMessage: "Yes",
	offMessage: "No"
});
