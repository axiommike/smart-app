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
	},
	model: function(params) {
		console.log("mortgage application route triggered");
		console.dir(params);
		return this.store.find("application", params.application_id);
	},
	actions: {
		error: function() {
			this.transitionTo("apply");
		},
		saveAssets: function() {
			console.dir(this.get("currentModel"));
			this.get("currentModel.applicant.assets").forEach((asset) => {
				asset.save();
			})
		},
		saveLiabilities: function() {
			this.get("currentModel.applicant.liabilities").forEach((liability) => {
				liability.save();
			});
		},
		saveEmployment: function() {
			this.get("currentModel.applicant.employment").forEach((employment) => {
				if (employment.get("company")) {
					if (employment.get("company.address")) {
						employment.get("company.address").save();
					}
				}
				if (employment.get("income")) {
					employment.get("income").save();
				}
				employment.save();
			});
		},
		saveIncome: function() {
			this.get("currentModel.applicant.income").forEach((income) => {
				income.save();
			});
		},
		saveProperties: function() {
			this.get("currentModel.applicant.properties").forEach((property) => {
				// first, save corresponding address
				if (property.get("address")) {
					property.get("address").save().then(() => {
						property.save();
					});
				}
			});
		}
	}
});
