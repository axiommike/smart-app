import Ember from "ember";

export default Ember.ObjectController.extend({
	ownsCurrentResidence: false,
	ownsOtherRealEstate: false,
	ownsOtherAssets: false,
	actions: {
		addProperty: function() {
			let addedProperty = this.store.createRecord("property"), mortgage = this.store.createRecord("liability", {type: "mortgage"}), addedAddress = this.store.createRecord("address"), addedPropertyAsset = this.store.createRecord("asset", {type: "property"});
			addedProperty.setProperties({
				mortgage: mortgage,
				address: addedAddress,
				asset: addedPropertyAsset
			});
			this.get("model.applicant.properties").pushObject(addedProperty);
		},
		addAsset: function(type) {
			let addedAsset = this.store.createRecord("asset");
			if (type) {
				addedAsset.set("type", type);
			}
			this.get("model.applicant.assets").pushObject(addedAsset);
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
