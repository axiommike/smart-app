import Ember from "ember";

export default Ember.Component.extend({
	tagName: "header",
	classNameBindings: [":wizard-step"],
	attributeBindings: ["role"],
	role: "status",
	title: Ember.computed("step", function() {
		return `Step ${this.get("step")}`;
	}),
	stepName: null,
	step: null,
	totalSteps: null
});
