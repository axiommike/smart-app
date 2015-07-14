import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Route.extend({
	serializeApplicant: function(applicant) {
		let applicantJSON = applicant.toJSON();
		if (applicant.get("addresses.length")) {
			let applicantAddresses = [];
			applicant.get("addresses").forEach((address) => {
				let resolvedAddress = address;
				if (address.get("content")) {
					resolvedAddress = address.get("content");
				}
				applicantAddresses.push(resolvedAddress.toJSON());
			});
			applicantJSON.addresses = applicantAddresses;
		}
		if (applicant.get("employment.length")) {
			let applicantEmployment = [];
			applicant.get("employment").forEach((employment) => {
				let employmentJSON = employment.toJSON();
				if (employment.get("employer")) {
					employment.get("employer").then((company) => {
						var employmentCompany = company ? company.toJSON() : null;
						if (company) {
							if (company.get("address")) {
								company.get("address").then((address) => {
									if (address) {
										employmentCompany.address = employment.get("employer.address").content.toJSON();
									}
								});
							}
						}
						employmentJSON.employer = employmentCompany;
					});
				}
				if (employment.get("income")) {
					employment.get("income").then((income) => {
						if (income) {
							employmentJSON.income = income.toJSON();
						}
					});
				}
				applicantEmployment.push(employmentJSON);
			});
			applicantJSON.employment = applicantEmployment;
		}
		if (applicant.get("liabilities.length")) {
			let applicantLiabilities = [];
			applicant.get("liabilities").forEach((liability) => {
				applicantLiabilities.push(liability.toJSON());
			});
			applicantJSON.liabilities = applicantLiabilities;
		}
		if (applicant.get("extraIncome.length")) {
			let applicantExtraIncome = [];
			applicant.get("extraIncome").forEach((income) => {
				applicantExtraIncome.push(income.toJSON());
			});
			applicantJSON.extraIncome = applicantExtraIncome;
		}
		if (applicant.get("assets.length")) {
			let applicantAssets = [];
			applicant.get("assets").forEach((asset) => {
				applicantAssets.push(asset.toJSON());
			});
			applicantJSON.assets = applicantAssets;
		}
		if (applicant.get("vehicles.length")) {
			let applicantVehicles = [];
			applicant.get("vehicles").forEach((vehicle) => {
				var vehicleJSON = vehicle.toJSON();
				if (vehicle.get("loan")) {
					vehicle.get("loan").then((loan) => {
						vehicleJSON.loan = loan.toJSON();
					});
				}
				if (vehicle.get("asset")) {
					vehicle.get("asset").then((asset) => {
						vehicleJSON.asset = asset.toJSON();
					});
				}
				applicantVehicles.push(vehicleJSON);
			});
			applicantJSON.vehicleAssets = applicantVehicles;
		}
		if (applicant.get("properties.length")) {
			let applicantProperties = [];
			applicant.get("properties").then((allProperties) => {
				allProperties.forEach((property) => {
					var propertyJSON = property.toJSON();
					if (property.get("mortgage")) {
						property.get("mortgage").then((propertyMortgage) => {
							propertyJSON.mortgage = propertyMortgage.toJSON();
						});
					}
					if (property.get("address")) {
						property.get("address").then((propertyAddress) => {
							propertyJSON.address = propertyAddress.toJSON();
						});
					}
					if (property.get("asset")) {
						property.get("asset").then((propertyAsset) => {
							propertyJSON.asset = propertyAsset.toJSON();
						});
					}
					if (property.get("lineOfCredit")) {
						property.get("lineOfCredit").then((propertyLineOfCredit) => {
							propertyJSON.lineOfCredit = propertyLineOfCredit.toJSON();
						});
					}
					applicantProperties.push(propertyJSON);
				});
				applicantJSON.properties = applicantProperties;
			});
		}
		return applicantJSON;
	},
	model: function () {
		// send JSON to server
		let model = this.get("currentModel"),
			nestedJSON = model.toJSON();
		if (model.get("coApplicants.length")) {
			let coApplicants = [];
			model.get("coApplicants").forEach((applicant) => {
				coApplicants.push(this.serializeApplicant(applicant));
			});
			nestedJSON.coApplicants = coApplicants;
		}
		if (model.get("applicant")) {
			nestedJSON.applicant = this.serializeApplicant(model.get("applicant"));
		}
		console.dir(nestedJSON);
		return new Ember.RSVP.Promise((resolve, reject) => {
			return ajax({
				type: "PUT",
				dataType: "JSON",
				url: "http://dev.myaxiom.ca/api/v1/",
				data: JSON.stringify(nestedJSON)
			}).then((completedApplication) => {
				return completedApplication; // the model will be the completed application in this case (not the "application model"
			});
		});
	},
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.set("currentStep", 5);
	}
});
