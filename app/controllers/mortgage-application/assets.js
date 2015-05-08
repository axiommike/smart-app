import Ember from "ember";

export default Ember.ObjectController.extend({
	ownsCurrentResidence: false,
	ownsOtherRealEstate: false,
	otherPropertiesToggled: function() {
		if (this.get("ownsOtherRealEstate") && this.get("model.applicant.otherProperties.length") === 0) {
			this.send("addProperty");
		}
	}.observes("ownsOtherRealEstate"),
	hasSavings: Ember.computed.oneWay("model.applicant.savingsAssets.length"),
	savingsToggled: function() {
		if (this.get("hasSavings") && this.get("model.applicant.savingsAssets.length") === 0) {
			this.send("addAsset", "savings");
		}
	}.observes("hasSavings"),
	hasPersonalItems: Ember.computed.oneWay("model.applicant.personalItemAssets.length"),
	personalItemsToggled: function() {
		if (this.get("hasPersonalItems") && this.get("model.applicant.personalItemAssets.length") === 0) {
			this.send("addAsset", "item");
		}
	}.observes("hasPersonalItems"),
	hasGICs: Ember.computed.oneWay("model.applicant.gicAssets.length"),
	gicsToggled: function() {
		if (this.get("hasGICs") && this.get("model.applicant.gicAssets.length") === 0) {
			this.send("addAsset", "gic");
		}
	}.observes("hasGICs"),
	hasInvestments: Ember.computed.oneWay("model.applicant.investmentAssets.length"),
	investmentsToggled: function() {
		if (this.get("hasInvestments") && this.get("model.applicant.investmentAssets.length") === 0) {
			this.send("addAsset", "investment");
		}
	}.observes("hasInvestments"),
	hasVehicles: Ember.computed.oneWay("model.applicant.vehicles.length"),
	vehiclesToggled: function() {
		if (this.get("hasVehicles") && this.get("model.applicant.vehicles.length") === 0) {
			this.send("addVehicle");
		}
	}.observes("hasVehicles"),
	hasRRSPs: Ember.computed.oneWay("model.applicant.rrspAssets.length"),
	rrspsToggled: function() {
		if (this.get("hasRRSPs") && this.get("model.applicant.rrspAssets.length") === 0) {
			this.send("addAsset", "rrsp");
		}
	}.observes("hasRRSPs"),
	ownsOtherAssets: Ember.computed.oneWay("model.applicant.otherAssets.length"),
	otherAssetsToggled: function() {
		if (this.get("ownsOtherAssets") && this.get("model.applicant.otherAssets.length") === 0) {
			this.send("addAsset", "other");
		}
	}.observes("ownsOtherAssets"),
	actions: {
		addProperty: function() {
			this.send("addPropertyMaster", this.get("model.applicant"));
		},
		removeProperty: function(property) {
			this.send("removePropertyMaster", property);
		},
		addVehicle: function() {
			this.send("addVehicleMaster", this.get("model.applicant"));
		},
		removeVehicle: function(vehicle) {
			this.send("removeVehicleMaster", vehicle);
		},
		addAsset: function(type) {
			this.send("addAssetMaster", this.get("model.applicant"), type);
		},
		removeAsset: function(asset) {
			this.send("removeAssetMaster", asset);
		},
		nextStep: function() {
			if (this.get("model.applicant.assets.length")) {
				this.send("saveAssets");
			}
			if (this.get("ownsCurrentResidence")) {
				this.send("saveProperties", this.get("model.applicant.currentProperties"));
			}
			if (this.get("ownsOtherRealEstate")) {
				this.send("saveProperties", this.get("model.applicant.otherProperties"));
			}
			// this.get("model.applicant").save();
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.liabilities", application);
			});
		}
	}
});
