import Ember from "ember";

export default Ember.Route.extend({
	setupController: function (controller, model) {
		// Call _super for default behaviour
		this._super(controller, model);
		if (model.get("applicant.currentProperties.length") === 0) { // only add the default current property if the applicant doesn't have any properties already
			let currentProperty = this.store.createRecord("property"), currentPropertyMortgage = this.store.createRecord("liability", {type: "mortgage"}), currentPropertyAddress = this.store.createRecord("address", {isCurrent: true}), currentPropertyAsset = this.store.createRecord("asset", {type: "property"});
			console.log(`About to set the mortgage ${currentPropertyMortgage.get("id")} to the property ${currentProperty.get("id")}`);
			currentProperty.setProperties(
				{
					isCurrent: true,
					valueType: "estimated", /* No one ever gets their properties appraised, right? */
					mortgage: currentPropertyMortgage,
					asset: currentPropertyAsset,
					address: currentPropertyAddress
				}
			);
			model.get("applicant.properties").pushObject(currentProperty);
		}
		else {
			model.set("ownsCurrentResidence", true);
		}
	}
});
