import Ember from "ember";

export default Ember.Route.extend({
	setupController: function (controller, model) {
		// Call _super for default behaviour
		this._super(controller, model);
		if (model.get("applicant.currentProperties.length") === 0) { // only add the default current property if the applicant doesn't have any properties already
			let currentProperty = this.store.createRecord("property"), currentApplicant = model.get("applicant"), currentPropertyMortgage = this.store.createRecord("liability", {type: "mortgage", applicant: currentApplicant}), currentPropertyAddress = this.store.createRecord("address", {isCurrent: true});
			currentProperty.setProperties(
				{
					isCurrent: true,
					valueType: "estimated", /* No one ever gets their properties appraised, right? */
					mortgage: currentPropertyMortgage,
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
