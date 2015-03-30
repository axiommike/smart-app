import Ember from "ember";

export default Ember.ObjectController.extend({
	currentProperty: null, /* a fake property */
	ownsCurrentResidence: false,
	ownsOtherRealEstate: false,
	actions: {
		addProperty: function() {
			let addedProperty = this.store.createRecord("property");
			let properties = this.get("model.applicant.properties");
			this.get("model.applicant.properties").pushObject(addedProperty);
		},
		nextStep: function() {
			if (this.get("ownsCurrentResidence")) {
				var applicantProperties = this.get("model.applicant.properties");
				applicantProperties.pushObject(this.get("currentProperty")); // include the current property in all of the properties
				applicantProperties.save().then((properties) => {
					this.get("model.applicant").set("applicant.properties", properties);
					this.get("model.applicant").save().then((applicant) => {
						this.get("model").set("model.applicant", applicant);
						this.get("model").save().then((application) => {
							this.transitionToRoute("apply.applicants", application);
						})
					})
				})
			}
		}
	}
});
