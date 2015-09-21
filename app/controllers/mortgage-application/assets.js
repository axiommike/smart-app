import Ember from "ember";

export default Ember.Controller.extend({
	ownsCurrentResidence: false,
	ownsCurrentResidenceToggled: function() {
		let currentProperty = this.get("model.applicant.currentProperty"),
			properties = this.get("model.applicant.properties");
		properties.then(() => {
			console.dir(`Ownscurrentresidence is ${this.get("ownsCurrentResidence")} and mortgage is ${currentProperty.get("mortgage")}`);
			if (this.get("ownsCurrentResidence") && !currentProperty.get("mortgage")) {
				// recreate a mortgage for the property if the user navigates back to assets
				let recreatedMortgage = this.store.createRecord("liability", {type: "mortgage"});
				currentProperty.set("mortgage", recreatedMortgage);
			}
		});
	}.observes("ownsCurrentResidence"),
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
			this.get("model.applicant").save();
		},
		addVehicle: function() {
			this.send("addVehicleMaster", this.get("model.applicant"));
			this.get("model.applicant").save();
		},
		removeVehicle: function(vehicle) {
			this.send("removeVehicleMaster", vehicle);
			this.get("model.applicant").save();
		},
		addAsset: function(type) {
			this.send("addAssetMaster", this.get("model.applicant"), type);
			this.get("model.applicant").save();
		},
		removeAsset: function(asset) {
			this.send("removeAssetMaster", asset);
			this.get("model.applicant").save();
		},
		nextStep: function() {
			if (this.get("model.applicant.assets.length")) {
				this.send("saveAssets");
			}
			if (this.get("ownsCurrentResidence")) {
				this.send("saveProperties", this.get("model.applicant.currentProperties"));
			}
			else {
				// remove the current property's mortgage
				let mortgage = this.get("model.applicant.currentProperty.mortgage");
				if (mortgage) {
					mortgage.then((resolvedMortgage) => {
						return resolvedMortgage.destroyRecord().then(() => {
							return this.get("model.applicant.currentProperty").save();
						});
					});
				}
			}
			if (this.get("ownsOtherRealEstate")) {
				this.send("saveProperties", this.get("model.applicant.otherProperties"));
			}
			else {
				this.get("model.applicant.properties").then((allApplicantProperties) => {
					this.get("model.applicant.otherProperties").forEach((property) => {
						this.send("removePropertyMaster", property);
					});
				});
			}
			if (this.get("hasVehicles")) {
				this.send("saveVehicles", this.get("model.applicant.vehicles"));
			}
			else if (this.get("model.applicant.vehicles.length")) {
				this.get("model.applicant.vehicles").then((vehicles) => {
					vehicles.forEach((vehicle) => {
						this.send("removeVehicleMaster", vehicle);
					});
				});
			}
			this.get("model").save().then((application) => {
				return application.get("applicant").save().then((savedApplicant) => {
					return this.transitionToRoute("mortgage-application.liabilities", application);
				});
			});
		}
	}
});
