import Ember from "ember";

export default Ember.Component.extend({
	tagName: "asset-table",
	attributeBindings: ["title"],
	assetTypes: [
		{value: "item", label: "Personal Item"},
		{value: "savings", label: "Savings Account"}, /* Chequing, savings accounts */
		{value: "gic", label: "GIC, Term Deposit"},
		{value: "resp", label: "RESP (Registered Educational Savings Plan)"},
		{value: "investment", label: "Stocks/Bonds Investment"},
		{value: "rrsp", label: "RRSP"},
		{value: "vehicle", label: "Vehicle"},
		{value: "other", label: "Other"}
	],
	valueTypes: [
		{value: "estimated", "label": "Estimated"},
		{value: "purchased", "label": "Purchased"},
		{value: "appraised", "label": "Appraised"}
	],
	title: null,
	caption: null,
	assets: Ember.A(),
	type: null,
	filteredAssets: Ember.computed.filter("assets", function(asset) {
		return this.get("type") ? asset.get("type") === this.get("type") : true;
	}),
	hasAssets: Ember.computed.notEmpty("assets"),
	assetCount: Ember.computed.alias("assets.length"),
	values: Ember.computed.mapBy("assets", "value"),
	totalAssets: function() {
		let assets = this.get("assets");
		return assets.reduce(function(previousValue, asset) {
			return parseInt(previousValue) + parseInt(asset.get("value"));
		}, 0);
	}.property("assets.@each.value"),
	onAdd: null,
	onRemove: null,
	actions: {
		addAsset: function() {
			this.sendAction("onAdd", this.get("type"));
		},
		removeAsset: function(property) {
			this.get("assets").removeObject(property);
			this.sendAction("onRemove", property);
		}
	}
});
