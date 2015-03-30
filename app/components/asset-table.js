import Ember from "ember";

export default Ember.Component.extend({
	tagName: "asset-table",
	assetTypes: [
		{value: "item", label: "Personal Item"},
		{value: "savings", label: "Savings Investment"},
		{value: "other", label: "Other"},
		{value: "rrsp", label: "RRSP"},
		{value: "stocks", label: "Stocks Investment"},
		{value: "vehicle", label: "Vehicle"}
	],
	valueTypes: [
		{value: "estimated", "label": "Estimated"},
		{value: "purchased", "label": "Purchased"},
		{value: "appraised", "label": "Appraised"}
	],
	summary: null,
	caption: null,
	properties: Ember.A(),
	hasAssets: Ember.computed.notEmpty("assets"),
	assetCount: Ember.computed.alias("properties.length"),
	values: Ember.computed.mapBy("assets", "value"),
	totalValue: Ember.computed.sum("values"),
	onAdd: null,
	onRemove: null,
	actions: {
		addAsset: function() {
			this.sendAction("onAdd");
		},
		removeAsset: function(property) {
			this.get("assets").removeObject(property);
			this.sendAction("onRemove", property);
		}
	}
});
