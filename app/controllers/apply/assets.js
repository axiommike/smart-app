import Ember from "ember";

export default Ember.ObjectController.extend({
	currentProperty: null, /* a fake property */
	ownsCurrentResidence: false,
	ownsOtherRealEstate: false,
	ownsOtherAssets: false,
	actions: {
		addProperty: function() {
			let addedProperty = this.store.createRecord("property");
			let properties = this.get("model.applicant.properties");
			this.get("model.applicant.properties").pushObject(addedProperty);
		},
		addAsset: function() {
			let addedAsset = this.store.createRecord("asset");
			this.get("model.applicant.assets").pushObject(addedAsset);
		},
		nextStep: function() {
			if (this.get("ownsOtherAssets")) {
				this.get("model.applicant.assets").save();
			}
			if (this.get("ownsOtherRealEstate")) {
				var applicantProperties = this.get("model.applicant.properties");
				if (this.get("ownsCurrentResidence")) {
					applicantProperties.pushObject(this.get("currentProperty")); // include the current property in all of the properties
				}
				applicantProperties.save().then((properties) => {
					this.get("model.applicant").save().then((applicant) => {
						this.get("model").save().then((application) => {
							this.transitionToRoute("apply.applicants", application);
						});
					});
				});
			}
			else {
				this.transitionToRoute("apply.applicants");
			}
		}
	}
});
