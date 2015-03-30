import Ember from "ember";

export default Ember.Component.extend({
	tagName: "property-table",
	propertyTypes: [
		{value: "condo", "label": "Condo"},
		{value: "duplex", "label": "Duplex"},
		{value: "house", "label": "House"}
	],
	valueTypes: [
		{value: "estimated", "label": "Estimated"},
		{value: "purchased", "label": "Purchased"},
		{value: "estimated", "label": "Appraised"}
	],
	summary: null,
	caption: null,
	properties: Ember.A(),
	property: null, /* A single property, meaning an array wasn't passed in */
	hasProperties: Ember.computed.notEmpty("properties"),
	propertyCount: Ember.computed.alias("properties.length"),
	totalValue: Ember.computed.sum("properties.@each.value"),
	onAdd: null,
	onRemove: null,
	actions: {
		addProperty: function() {
			this.sendAction("onAdd");
		},
		removeProperty: function(property) {
			this.sendAction("onRemove", property);
		}
	}
});
