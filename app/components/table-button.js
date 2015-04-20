import Ember from "ember";

export default Ember.Component.extend({
	tagName: "button",
	disabled: false,
	title: null,
	role: "button",
	attributeBindings: ["disabled", "role", "title"],
	icon: null,
	type: null,
	classNameBindings: [":button", "type:has-type", "icon:has-icon"]
});
