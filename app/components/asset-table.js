import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "asset-table",
	attributeBindings: ["title"],
	valueTypes: [
		{value: "estimated", "label": "Estimated"},
		{value: "purchased", "label": "Purchased"},
		{value: "appraised", "label": "Appraised"}
	],
	title: null,
	caption: null,
	assets: Ember.A(),
	type: null,
	typeName: Ember.computed("type", function() {
		return this.get("type") ? Ember.String.capitalize(this.get("type")) : "Asset";
	}),
	filteredAssets: Ember.computed.filter("assets", function(asset) {
		return this.get("type") ? asset.get("type") === this.get("type") : true;
	}),
	hasAssets: Ember.computed.notEmpty("assets"),
	assetCount: Ember.computed.alias("assets.length"),
	values: Ember.computed.mapBy("assets", "value"),
	totalAssets: function() {
		let assets = this.get("filteredAssets");
		return assets.reduce(function(previousValue, asset) {
			return parseInt(previousValue) + parseInt(asset.get("value"));
		}, 0);
	}.property("filteredAssets.@each.value"),
	onAdd: null,
	onRemove: null,
	actions: {
		addAsset: function() {
			this.sendAction("onAdd", this.get("type"));
		},
		removeAsset: function(asset) {
			return asset.destroyRecord().then((deletedAsset) => {
				this.sendAction("onRemove", deletedAsset);
			});
		}
	}
});
