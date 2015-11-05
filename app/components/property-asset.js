import Ember from "ember";
import autosave from "ember-autosave";

export default Ember.Component.extend({
	classNameBindings: [":property-asset-instance", "hasMortgage", "hasLineOfCredit"],
	hasMortgage: Ember.computed.bool("property.mortgage"),
	property: null,
	propertyProxy: autosave("property"),
	hasLineOfCredit: false, /* Specifically not bound to model to allow for default disabled */
	addressType: null
});
