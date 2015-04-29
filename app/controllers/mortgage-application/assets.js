import Ember from "ember";

export default Ember.ObjectController.extend({
	ownsCurrentResidence: false,
	ownsOtherRealEstate: false,
	otherPropertiesToggled: function() {
		if (this.get("ownsOtherRealEstate") && this.get("model.applicant.otherProperties.length") === 0) {
			this.send("addProperty");
		}
	}.observes("ownsOtherRealEstate"),
	hasSavings: false,
	savingsToggled: function() {
		if (this.get("hasSavings") && this.get("model.applicant.savingsAssets.length") === 0) {
			this.send("addAsset", "savings");
		}
	}.observes("hasSavings"),
	hasPersonalItems: false,
	personalItemsToggled: function() {
		if (this.get("hasPersonalItems") && this.get("model.applicant.personalItemAssets.length") === 0) {
			this.send("addAsset", "item");
		}
	}.observes("hasPersonalItems"),
	hasGICs: false,
	gicsToggled: function() {
		if (this.get("hasGICs") && this.get("model.applicant.gicAssets.length") === 0) {
			this.send("addAsset", "gic");
		}
	}.observes("hasGICs"),
	hasRESPs: false,
	respsToggled: function() {
		if (this.get("hasRESPs") && this.get("model.applicant.respAssets.length") === 0) {
			this.send("addAsset", "resp");
		}
	}.observes("hasRESPs"),
	hasInvestments: false,
	investmentsToggled: function() {
		if (this.get("hasInvestments") && this.get("model.applicant.investmentAssets.length") === 0) {
			this.send("addAsset", "investment");
		}
	}.observes("hasInvestments"),
	hasVehicles: false,
	vehiclesToggled: function() {
		if (this.get("hasVehicles") && this.get("model.applicant.vehicles.length") === 0) {
			this.send("addVehicle");
		}
	}.observes("hasVehicles"),
	hasRRSPs: false,
	rrspsToggled: function() {
		if (this.get("hasRRSPs") && this.get("model.applicant.rrspAssets.length") === 0) {
			this.send("addAsset", "rrsp");
		}
	}.observes("hasRRSPs"),
	ownsOtherAssets: false,
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
				let applicantAssets = this.get("model.applicant.assets");
				applicantAssets.forEach((asset) => {
					asset.save().then((savedAsset) => {
						console.log(`Saved ${asset.get("type")} of id ${asset.get("id")}`);
					});
				});
			}
			if (this.get("ownsCurrentResidence") || this.get("ownsOtherRealEstate")) {
				this.get("model.applicant.properties").forEach((property) => {
					property.get("address").save().then((address) => {
						console.log(`Saved address ${address.get("id")} of property ${property.get("id")}`);
					});
					if (property.get("mortgage")) {
						property.get("mortgage").save().then((mortgage) => {
							console.log(`Saved mortgage ${mortgage.get("id")}`);
						});
					}
					property.save().then((savedProperty) => {
						console.log(`Saved property ${savedProperty.get("id")}`)
					});
				});
			}
			// this.get("model.applicant").save();
			this.get("model").save().then((application) => {
				this.transitionToRoute("mortgage-application.liabilities", application);
			});
		}
	}
});
