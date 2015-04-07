import Ember from "ember";

export default Ember.Component.extend({
	tagName: "asset-table",
	assetTypes: [
		{value: "item", label: "Personal Item"},
		{value: "savings", label: "Savings Investment"},
		{value: "tfsa", label: "Tax-Free Savings Account (TFSA)"},
		{value: "other", label: "Other"},
		{value: "gic", label: "GIC, Term Deposit"},
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
	assets: Ember.A(),
	type: null,
	filteredAssets: Ember.computed.filterBy("assets", "type", "type"),
	hasAssets: Ember.computed.notEmpty("assets"),
	assetCount: Ember.computed.alias("assets.length"),
	values: Ember.computed.mapBy("assets", "value"),
	totalAssets: function() {
		let assets = this.get("assets");
		return assets.reduce(function(previousValue, asset) {
			return previousValue + asset.get("value");
		}, 0);
	}.property("assets.@each.value"),
	onAdd: null,
	onRemove: null,
	actions: {
		addAsset: function() {
			this.sendAction("onAdd", this.get("assets"));
		},
		removeAsset: function(property) {
			this.get("assets").removeObject(property);
			this.sendAction("onRemove", property);
		}
	}
});
