import Ember from "ember";
import ajax from "ic-ajax";
import ENV from "../../config/environment";

export default Ember.Route.extend({
	titleToken: "Thank You",
	serializeApplicant: function (applicant) {
		let applicantJSON = applicant.toJSON(),
			promises = [];
		if (applicant.get("addresses.length")) {
			let applicantAddresses = [];
			applicant.get("addresses").forEach((address) => {
				let resolvedAddress = address;
				if (address) {
					if (address.get("content")) {
						resolvedAddress = address.get("content");
					}
					applicantAddresses.push(resolvedAddress.toJSON());
				}
			});
			applicantJSON.addresses = applicantAddresses;
		}
		if (applicant.get("employment.length")) {
			let applicantEmployment = [];
			promises.push(applicant.get("employment").then((allEmployment) => {
				allEmployment.forEach((employment) => {
					let employmentJSON = employment.toJSON(),
						employmentPromises = [];
					if (employment.get("employer")) {
						employmentPromises.push(employment.get("employer").then((company) => {
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
						}));
					}
					if (employment.get("income")) {
						employmentPromises.push(employment.get("income").then((income) => {
							if (income) {
								employmentJSON.income = income.toJSON();
							}
						}));
					}
					applicantEmployment.push(employmentJSON);
				});
				applicantJSON.employment = applicantEmployment;
			}));
		}
		if (applicant.get("liabilities.length")) {
			promises.push(applicant.get("liabilities").then((allLiabilities) => {
				let applicantLiabilities = [];
				allLiabilities.forEach((liability) => {
					applicantLiabilities.push(liability.toJSON());
				});
				applicantJSON.liabilities = applicantLiabilities;
			}));
		}
		if (applicant.get("extraIncome.length")) {
			let applicantExtraIncome = [];
			applicant.get("extraIncome").forEach((income) => {
				applicantExtraIncome.push(income.toJSON());
			});
			applicantJSON.extraIncome = applicantExtraIncome;
		}
		if (applicant.get("assets.length")) {
			promises.push(applicant.get("assets").then((allAssets) => {
				let applicantAssets = [];
				allAssets.forEach((asset) => {
					applicantAssets.push(asset.toJSON());
				});
				applicantJSON.assets = applicantAssets;
			}));
		}
		if (applicant.get("vehicles.length")) {
			promises.push(applicant.get("vehicles").then((allVehicles) => {
				let applicantVehicles = [];
				allVehicles.forEach((vehicle) => {
					var vehicleJSON = vehicle.toJSON();
					if (vehicle.get("loan")) {
						vehicle.get("loan").then((loan) => {
							if (loan) {
								vehicleJSON.loan = loan.toJSON();
							}
						});
					}
					if (vehicle.get("asset")) {
						vehicle.get("asset").then((asset) => {
							if (asset) {
								vehicleJSON.asset = asset.toJSON();
							}
						});
					}
					applicantVehicles.push(vehicleJSON);
				});
				applicantJSON.vehicleAssets = applicantVehicles;
			}));
		}
		if (applicant.get("properties.length")) {
			let applicantProperties = [];
			promises.push(applicant.get("properties").then((allProperties) => {
				allProperties.forEach((property) => {
					var propertyJSON = property.toJSON();
					if (property.get("mortgage")) {
						property.get("mortgage").then((propertyMortgage) => {
							if (propertyMortgage) {
								propertyJSON.mortgage = propertyMortgage.toJSON();
							}
						});
					}
					if (property.get("address")) {
						property.get("address").then((propertyAddress) => {
							if (propertyAddress) {
								propertyJSON.address = propertyAddress.toJSON();
							}
						});
					}
					if (property.get("asset")) {
						property.get("asset").then((propertyAsset) => {
							if (propertyAsset) {
								propertyJSON.asset = propertyAsset.toJSON();
							}
						});
					}
					if (property.get("lineOfCredit")) {
						property.get("lineOfCredit").then((propertyLineOfCredit) => {
							if (propertyLineOfCredit) {
								propertyJSON.lineOfCredit = propertyLineOfCredit.toJSON();
							}
						});
					}
					applicantProperties.push(propertyJSON);
				});
				applicantJSON.properties = applicantProperties;
			}));
		}
		return Ember.RSVP.all(promises).then(() => {
			return applicantJSON;
		});
	},
	afterModel: function (resolvedModel, transition) {
		// send JSON to server
		let nestedJSON = resolvedModel.toJSON(),
			applicantPromises = [];
		if (resolvedModel.get("coApplicants.length")) {
			nestedJSON.coApplicants = []; // reset the array
			resolvedModel.get("coApplicants").forEach((applicant) => {
				applicantPromises.push(this.serializeApplicant(applicant).then((coApplicant) => {
					return nestedJSON.coApplicants.push(coApplicant);
				}));
			});
		}
		if (resolvedModel.get("applicant")) {
			applicantPromises.push(this.serializeApplicant(resolvedModel.get("applicant")).then((serializedApplicant) => {
				return nestedJSON.applicant = serializedApplicant;
			}));
		}
		return Ember.RSVP.all(applicantPromises).then(() => {
			console.dir(nestedJSON);
			console.dir(nestedJSON.applicant.properties);
			console.dir(JSON.stringify(nestedJSON));
			return ajax({
				type: "PUT",
				dataType: "JSON",
				url: `${ENV.apiURL}/v1/`,
				data: JSON.stringify(nestedJSON)
			}).then((completedApplication) => {
				console.dir(completedApplication);
				resolvedModel.setProperties({
					isIncomplete: false,
					applicationID: completedApplication.application._bean_data.appid
				});
				resolvedModel.set("isIncomplete", false);
				return resolvedModel.save();
			}).catch((error) => {
				return Ember.RSVP.reject(error);
			});
		}).catch((reason) => {
			return Ember.RSVP.reject(reason);
		});
	},
	beforeModel: function () {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.setProperties({
			currentStep: 5,
			showBreadcrumbs: true,
			hideLegacy: true
		});
	}
});
