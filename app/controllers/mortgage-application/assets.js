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
	hasRESPs: Ember.computed.oneWay("model.applicant.respAssets.length"),
	respsToggled: function() {
		if (this.get("hasRESPs") && this.get("model.applicant.respAssets.length") === 0) {
			this.send("addAsset", "resp");
		}
	}.observes("hasRESPs"),
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
			console.log(`Add property triggered`);
			let addedProperty = this.store.createRecord("property"), mortgage = this.store.createRecord("liability", {type: "mortgage"}), addedAddress = this.store.createRecord("address"), addedPropertyAsset = this.store.createRecord("asset", {type: "property"});
			addedProperty.setProperties({
				mortgage: mortgage,
				address: addedAddress,
				asset: addedPropertyAsset
			});
			this.get("model.applicant.liabilities").pushObject(mortgage);
			this.get("model.applicant.assets").pushObject(addedPropertyAsset);
			this.get("model.applicant.properties").pushObject(addedProperty);
		},
		removeProperty: function(property) {
			let propertyAsset = property.get("asset"),
				propertyMortgage = property.get("mortgage");
			if (propertyAsset) {
				propertyAsset.destroyRecord();
			}
			if (propertyMortgage) {
				propertyMortgage.destroyRecord();
			}
			property.destroyRecord().then((deletedProperty) => {
				console.log(`Successfully deleted property ${deletedProperty.get("id")}`);
			});
		},
		addVehicle: function() {
			let addedVehicle = this.store.createRecord("vehicle"), vehicleLoan = this.store.createRecord("liability", {type: "auto-loan"}), vehicleAsset = this.store.createRecord("asset", {type: "vehicle"}), applicant = this.get("model.applicant");
			addedVehicle.setProperties({
				asset: vehicleAsset,
				loan: vehicleLoan
			});
			this.get("model.applicant.assets").pushObject(vehicleAsset);
			this.get("model.applicant.liabilities").pushObject(vehicleLoan);
			this.get("model.applicant.vehicles").pushObject(addedVehicle);
		},
		removeVehicle: function(vehicle) {
			let vehicleLoan = vehicle.get("loan"),
				vehicleAsset = vehicle.get("asset");
			if (vehicleLoan) {
				vehicleLoan.destroyRecord();
			}
			if (vehicleAsset) {
				vehicleAsset.destroyRecord();
			}
			vehicle.destroyRecord().then((result) => {
				console.log(`Successfully deleted vehicle ${result.get("id")}`);
			});
		},
		addAsset: function(type) {
			let addedAsset = this.store.createRecord("asset");
			if (type) {
				addedAsset.set("type", type);
			}
			this.get("model.applicant.assets").pushObject(addedAsset);
		},
		removeAsset: function(asset) {
			asset.destroyRecord().then((result) => {
				console.log(`Successfully deleted asset ${result.get("id")}`);
			});
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
