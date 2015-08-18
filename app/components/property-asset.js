import Ember from "ember";

export default Ember.Component.extend({
	classNameBindings: [":property-asset-instance", "hasMortgage", "hasLineOfCredit"],
	hasMortgage: Ember.computed.bool("property.mortgage"),
	property: null,
	hasLineOfCredit: false, /* Specifically not bound to model to allow for default disabled */
	addressType: null
});
