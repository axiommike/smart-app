import Ember from "ember";

export default Ember.Route.extend({
	addEmployment: function(applicant, isCurrent) {
		let createdEmployment = this.store.createRecord("employment", {isCurrent: isCurrent}),
			createdEmploymentAddress = this.store.createRecord("address"),
			createdEmploymentCompany = this.store.createRecord("company", {address: createdEmploymentAddress});
		createdEmployment.setProperties({
			employer: createdEmploymentCompany
		});
		applicant.get("employment").pushObject(createdEmployment);
		createdEmploymentAddress.save();
		createdEmploymentCompany.save();
		createdEmployment.save();
	},
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
			model.get("applicant.liabilities").pushObject(currentPropertyMortgage);
			model.get("applicant.assets").pushObject(currentPropertyAsset);
			model.get("applicant.previousAddresses").pushObject(currentPropertyAddress);
			// save all these
			currentPropertyAsset.save();
			currentPropertyAddress.save();
			currentPropertyMortgage.save();
			currentProperty.save().then((currentSavedProperty) => {
				console.log(`Saved new current property of id ${currentSavedProperty.get("id")}`);
			});
		}
		if (model.get("applicant.employment.length") === 0) {
			this.addEmployment(model.get("applicant"), true);
		}
	},
	model: function(params) {
		console.log("mortgage application route triggered");
		console.dir(params);
		return this.store.find("application", params.application_id);
	},
	actions: {
		/*error: function() {
			this._super();
			this.transitionTo("apply");
		},*/
		addEmployment: function(applicant, isCurrent) {
			this.addEmployment(applicant, isCurrent);
		},
		addApplicant: function() {
			let applicantAddress = this.store.createRecord("address",
					{isCurrent: true}
				),
				applicantCurrentPropertyMortgage = this.store.createRecord("liability", {type: "mortgage"}),
				applicantCurrentPropertyAsset = this.store.createRecord("asset", {type: "property"}),
				applicantCurrentProperty = this.store.createRecord("property",
					{
						isCurrent: true,
						address: applicantAddress,
						asset: applicantCurrentPropertyAsset,
						mortgage: applicantCurrentPropertyMortgage
					}),
				addedApplicant = this.store.createRecord("applicant",
					{firstName: "New Applicant"}
				);
			addedApplicant.get("properties").pushObject(applicantCurrentProperty);
			this.get("currentModel.applicants").pushObject(addedApplicant);
			// save records
			applicantCurrentPropertyAsset.save();
			applicantCurrentPropertyMortgage.save();
			applicantCurrentProperty.save();
			applicantAddress.save();
			addedApplicant.save();
		},
		removeApplicant: function(coApplicant) {
			return coApplicant.destroyRecord();
		},
		addProperty: function() {
			console.log(`Add property triggered`);
			let addedProperty = this.store.createRecord("property"), mortgage = this.store.createRecord("liability", {type: "mortgage"}), addedAddress = this.store.createRecord("address"), addedPropertyAsset = this.store.createRecord("asset", {type: "property"});
			addedProperty.setProperties({
				mortgage: mortgage,
				address: addedAddress,
				asset: addedPropertyAsset
			});
			this.get("currentModel.applicant.liabilities").pushObject(mortgage);
			this.get("currentModel.applicant.assets").pushObject(addedPropertyAsset);
			this.get("currentModel.applicant.properties").pushObject(addedProperty);
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
			return property.destroyRecord().then((deletedProperty) => {
				console.log(`Successfully deleted property ${deletedProperty.get("id")}`);
			});
		},
		addVehicle: function() {
			let addedVehicle = this.store.createRecord("vehicle"), vehicleLoan = this.store.createRecord("liability", {type: "auto-loan"}), vehicleAsset = this.store.createRecord("asset", {type: "vehicle"}), applicant = this.get("model.applicant");
			addedVehicle.setProperties({
				asset: vehicleAsset,
				loan: vehicleLoan
			});
			this.get("currentModel.applicant.assets").pushObject(vehicleAsset);
			this.get("currentModel.applicant.liabilities").pushObject(vehicleLoan);
			this.get("currentModel.applicant.vehicles").pushObject(addedVehicle);
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
			this.get("currentModel.applicant.assets").pushObject(addedAsset);
		},
		removeAsset: function(asset) {
			asset.destroyRecord().then((result) => {
				console.log(`Successfully deleted asset ${result.get("id")}`);
			});
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
		saveApplicants: function(applicants) {
			if (!applicants) {
				applicants = this.get("currentModel.applicants");
			}
			applicants.forEach((applicant) => {
				applicant.save();
			});
		},
		saveProperties: function(properties) {
			if (!properties) {
				properties = this.get("currentModel.applicant.properties");
			}
			properties.forEach((property) => {
				// first, save corresponding address
				if (property.get("address")) {
					property.get("address").save();
				}
				if (property.get("mortgage")) {
					property.get("mortgage").save();
				}
				if (property.get("asset")) {
					property.get("asset").save();
				}
				property.save().then((savedProperty) => {
					console.log(`Saved property of ID ${savedProperty.get("id")}`);
				});
			});
		}
	}
});
