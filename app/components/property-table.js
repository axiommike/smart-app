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
		{value: "appraised", "label": "Appraised"}
	],
	summary: null,
	caption: null,
	properties: Ember.A(),
	property: null, /* A single property, meaning an array wasn't passed in */
	hasProperties: Ember.computed.notEmpty("properties"),
	propertyCount: Ember.computed.alias("properties.length"),
	values: Ember.computed.mapBy("properties", "value"),
	totalValue: Ember.computed.sum("values"),
	onAdd: null,
	onRemove: null,
	actions: {
		addProperty: function() {
			this.sendAction("onAdd");
		},
		removeProperty: function(property) {
			this.get("properties").removeObject(property);
			this.sendAction("onRemove", property);
		}
	}
});
