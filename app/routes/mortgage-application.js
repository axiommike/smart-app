import Ember from "ember";

export default Ember.Route.extend({
	addEmployment: function(applicant, isCurrent) {
		let createdEmployment = this.store.createRecord("employment", {isCurrent: isCurrent}),
			createdEmploymentAddress = this.store.createRecord("address"),
			createdEmploymentIncome = this.store.createRecord("income", {source: "employment"}),
			createdEmploymentCompany = this.store.createRecord("company", {address: createdEmploymentAddress});
		createdEmployment.setProperties({
			employer: createdEmploymentCompany,
			income: createdEmploymentIncome
		});
		applicant.get("income").pushObject(createdEmploymentIncome);
		applicant.get("employment").pushObject(createdEmployment);
		createdEmploymentAddress.save();
		createdEmploymentIncome.save();
		createdEmploymentCompany.save();
		createdEmployment.save();
		applicant.save();
		return createdEmployment;
	},
	addProperty: function(applicant, isCurrent) {
		let addedProperty = this.store.createRecord("property", {isCurrent: isCurrent}), addedPropertyMortgage = this.store.createRecord("liability", {type: "mortgage"}), addedPropertyAddress = this.store.createRecord("address", {isCurrent: isCurrent}), addedPropertyAsset = this.store.createRecord("asset", {type: "property"}), addedPropertyLineOfCredit = this.store.createRecord("liability", {type: "mortgage"});
		addedProperty.setProperties({
			mortgage: addedPropertyMortgage,
			lineOfCredit: addedPropertyLineOfCredit,
			address: addedPropertyAddress,
			asset: addedPropertyAsset
		});
		applicant.get("liabilities").pushObject(addedPropertyMortgage);
		applicant.get("liabilities").pushObject(addedPropertyLineOfCredit);
		applicant.get("assets").pushObject(addedPropertyAsset);
		applicant.get("properties").pushObject(addedProperty);
		if (!isCurrent) {
			applicant.get("previousAddresses").pushObject(addedPropertyAddress);
		}
		// save all these
		addedPropertyAsset.save();
		addedPropertyAddress.save();
		addedPropertyMortgage.save();
		addedPropertyLineOfCredit.save();
		addedProperty.save().then((currentSavedProperty) => {
			console.log(`Saved new current property of id ${currentSavedProperty.get("id")}`);
		});
		applicant.save();
		return addedProperty;
	},
	addApplicant: function(allApplicants, name) {
		let addedApplicant = this.store.createRecord("applicant", {firstName: name});
		this.addProperty(addedApplicant, true);
		this.addEmployment(addedApplicant, true);
		allApplicants.pushObject(addedApplicant);
		addedApplicant.save();
	},
	setupController: function (controller, model) {
		// Call _super for default behaviour
		this._super(controller, model);
		if (model.get("applicant.currentProperties.length") === 0) { // only add the default current property if the applicant doesn't have any properties already
			this.addProperty(model.get("applicant"), true);
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
		addEmploymentMaster: function(applicant, isCurrent) {
			this.addEmployment(applicant, isCurrent);
		},
		addApplicantMaster: function() {
			this.addApplicant(this.get("currentModel.applicants"), "New Co-Applicant");
		},
		removeApplicantMaster: function(coApplicant) {
			return coApplicant.destroyRecord();
		},
		addPropertyMaster: function(applicant) {
			this.addProperty(applicant, false);
		},
		removePropertyMaster: function(property) {
			let propertyAsset = property.get("asset"),
				propertyMortgage = property.get("mortgage"),
				propertyLineOfCredit = property.get("lineOfCredit"),
				propertyAddress = property.get("address");
			if (propertyAsset) {
				propertyAsset.destroyRecord();
			}
			if (propertyLineOfCredit) {
				propertyLineOfCredit.destroyRecord();
			}
			if (propertyMortgage) {
				propertyMortgage.destroyRecord();
			}
			if (propertyAddress) {
				propertyAddress.destroyRecord();
			}
			return property.destroyRecord().then((deletedProperty) => {
				console.log(`Successfully deleted property ${deletedProperty.get("id")}`);
			});
		},
		removeEmploymentMaster: function(employment) {
			let employmentCompany = employment.get("employer"),
				employmentCompanyAddress = employmentCompany ? employmentCompany.get("address") : null,
				employmentIncome = employment.get("income");
			if (employmentCompany) {
				employmentCompany.destroyRecord();
			}
			if (employmentCompanyAddress) {
				employmentCompanyAddress.destroyRecord();
			}
			if (employmentIncome) {
				employmentIncome.destroyRecord();
			}
			employment.destroyRecord();
		},
		addVehicleMaster: function(applicant) {
			let addedVehicle = this.store.createRecord("vehicle"), vehicleLoan = this.store.createRecord("liability", {type: "auto-loan"}), vehicleAsset = this.store.createRecord("asset", {type: "vehicle"});
			addedVehicle.setProperties({
				asset: vehicleAsset,
				loan: vehicleLoan
			});
			applicant.get("assets").pushObject(vehicleAsset);
			applicant.get("liabilities").pushObject(vehicleLoan);
			applicant.get("vehicles").pushObject(addedVehicle);
			vehicleLoan.save();
			vehicleAsset.save();
			addedVehicle.save();
		},
		removeVehicleMaster: function(vehicle) {
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
		addAssetMaster: function(applicant, type) {
			let addedAsset = this.store.createRecord("asset", {type: type});
			addedAsset.save().then((savedAsset) => {
				applicant.get("assets").pushObject(savedAsset);
			});
		},
		removeAssetMaster: function(asset) {
			asset.destroyRecord().then((result) => {
				console.log(`Successfully deleted asset ${result.get("id")}`);
			});
		},
		addLiabilityMaster: function(applicant, type) {
			let createdLiability = this.store.createRecord("liability", {type: type});
			createdLiability.save().then((savedLiability) => {
				applicant.get("liabilities").pushObject(savedLiability);
			});
		},
		removeLiabilityMaster: function(liability) {
			liability.destroyRecord().then((result) => {
				console.log(`Successfully deleted liability ${result.get("id")}`);
			});
		},
		addIncomeMaster: function(applicant) {
			let addedIncome = store.createRecord("income");
			addedIncome.save().then((savedIncome) => {
				applicant.get("income").pushObject(savedIncome);
			});
		},
		removeIncomeMaster: function(income) {
			income.destroyRecord().then((deletedIncome) => {
				console.log(`Successfully deleted income ${deletedIncome.get("id")}`);
			});
		},
		saveAssets: function() {
			console.dir(this.get("currentModel"));
			this.get("currentModel.applicant.assets").forEach((asset) => {
				asset.save();
			});
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
