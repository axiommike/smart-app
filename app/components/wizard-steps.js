import Ember from "ember";

export default Ember.Component.extend({
	tagName: "wizard-steps",
	classNameBindings: [":wizard-steps", "hasSteps"],
	attributeBindings: ["realStepNumber"],
	steps: Ember.A(),
	totalSteps: Ember.computed.alias("steps.length"),
	showBreadCrumbs: false,
	currentStepNumber: 0,
	realStepNumber: Ember.computed("currentStepNumber", function() {
		return this.get("currentStepNumber") + 1;
	}),
	currentStepIcon: Ember.computed("steps", "currentStepNumber", function() {
		return this.get("validStep") ? this.get("steps")[this.get("currentStepNumber")].icon : null;
	}),
	min: 0,
	validStep: Ember.computed.lte("currentStepNumber", "totalSteps"),
	currentStepName: Ember.computed("currentStepNumber", "steps", function() {
		return this.get("steps")[this.get("currentStepNumber")];
	})
});
