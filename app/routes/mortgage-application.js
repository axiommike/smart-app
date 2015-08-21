import Ember from "ember";
import ajax from "ic-ajax";
import ENV from "../config/environment";

export default Ember.Route.extend({
	addEmployment: function(applicant, isCurrent) {
		isCurrent = isCurrent ? true : false;
		let createdEmployment = this.store.createRecord("employment", {isCurrent: isCurrent}),
			createdEmploymentAddress = this.store.createRecord("address"),
			createdEmploymentIncome = this.store.createRecord("income", {source: "employment"}),
			createdEmploymentCompany = this.store.createRecord("company", {address: createdEmploymentAddress});
		createdEmployment.setProperties({
			employer: createdEmploymentCompany,
			income: createdEmploymentIncome
		});
		applicant.get("income").pushObject(createdEmploymentIncome);
		applicant.get("employment").pushObject(createdEmployment); // this somehow triggers the "addEmployment" action again
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
			valueType: "estimated",
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
	queryParams: {
		agent: {
			refreshModel: true
		},
		cid: {
			refreshModel: true
		},
		brokerage: {
			refreshModel: true
		}
	},
	checkClientID: function(params, application) {
		if (params["cid"]) {
			// first, check the offline cache to see if the client is there; otherwise, fall back to the API
			return this.store.find("applicant", params.cid).then((applicant) => {
				application.set("applicant", applicant);
				return application.save();
			}, (rejection) => {
				return ajax({
					url: `${ENV.apiURL}/applicant/?cid=${encodeURIComponent(params.cid)}`,
					type: "GET",
					dataType: "JSON"
				}).then((applicant) => {
					if (applicant["applicant"]) {
						console.dir(applicant.applicant);
						if (applicant.applicant["employment"]) {
							var applicantEmployment = [];
							applicant.applicant.employment.forEach((employment) => {
								var employmentAddress = null;
								if (employment["company"]) {
									if (employment.company["address"]) {
										let generatedCompanyAddress = this.store.createRecord("address", employment.company.address);
										generatedCompanyAddress.save().then((savedGeneratedAddress) => {
											employmentAddress = savedGeneratedAddress;
										});
										delete employment.company.address;
									}
									let generatedCompany = this.store.createRecord("company", employment.company);
									if (employmentAddress) {
										generatedCompany.set("address", employmentAddress);
									}
									generatedCompany.save().then((savedGeneratedCompany) => {
										employment.company = savedGeneratedCompany;
									});
								}
								let generatedEmployment = this.store.createRecord("employment", employment);
								generatedEmployment.save().then((savedEmployment) => {
									applicantEmployment.push(savedEmployment);
								});
							});
							applicant.applicant.employment = applicantEmployment;
						}
						if (applicant.applicant["previousAddresses"]) {
							let applicantPreviousAddresses = [];
							applicant.applicant.previousAddresses.forEach((address) => {
								this.store.find("address", address.id).then((resolvedAddress) => {
									applicantPreviousAddresses.push(resolvedAddress);
								}, (reject) => {
									let generatedAddress = this.store.createRecord("address", address);
									return generatedAddress.save().then((savedAddress) => {
										applicantPreviousAddresses.push(savedAddress);
									});
								});
							});
							applicant.applicant.previousAddresses = applicantPreviousAddresses;
						}
						let addedApplicant = this.store.createRecord("applicant", applicant.applicant);
						application.set("applicant", addedApplicant);
						return addedApplicant.save().then(() => {
							return application.save();
						});
					}
					else {
						return Ember.RSVP.reject("Sorry, but it looks like we need to update our API");
					}
				}, (requestFailure) => {
					switch (requestFailure.jqXHR.status) {
						case 400:
							return Ember.RSVP.reject("Looks like we need to update our API");
						case 401:
							return Ember.RSVP.reject("Looks like something's wrong with the authentication or authenticity of this page.");
						case 404:
							return Ember.RSVP.reject("Applicant not found");
						default:
							if (requestFailure.jqXHR["responseJSON"]) {
								if (requestFailure.jqXHR.responseJSON["message"]) {
									return Ember.RSVP.reject(requestFailure.jqXHR.responseJSON.message);
								}
							}
						return application.save();
					}
				});
			});
		}
		else {
			return application.save();
		}
	},
	setDefaultBrokerage: function (application, params) {
		return this.store.find("brokerage", 2).then((resolvedBrokerage) => {
			// resolve edge cases where client has already fetched Axiom, but it's not default
			if (!resolvedBrokerage.get("isDefault")) {
				resolvedBrokerage.set("isDefault", true);
				return resolvedBrokerage.save().then((updatedBrokerage) => {
					application.set("brokerage", updatedBrokerage);
					return application.save().then((updatedApplication) => {
						return this.checkClientID(params, updatedApplication);
					});
				});
			}
			application.set("brokerage", resolvedBrokerage);
			return application.save().then((updatedApplication) => {
				return this.checkClientID(params, updatedApplication);
			});
		}).catch(() => {
			let createdBrokerage = this.store.createRecord("brokerage", {
				id:        "2",
				name:      "Axiom Mortgage Solutions",
				isDefault: true
			});
			return createdBrokerage.save().then((savedBrokerage) => {
				application.set("brokerage", savedBrokerage);
				return application.save().then((updatedApplication) => {
					return this.checkClientID(params, updatedApplication);
				});
			});
		});
	},
	model: function(params) {
		return this.store.find("application", params.application_id);
	},
	afterModel: function(resolvedModel, transition) {
		let params = this.paramsFor("mortgage-application");
		if (params["agent"]) {
			return this.store.find("agent", params.agent).then((agent) => {
				resolvedModel.set("agent", agent);
				return this.checkClientID(params, resolvedModel);
			}).catch((rejection) => {
				return ajax({
					url: `${ENV.apiURL}/agent/${params.agent}`,
					type: "GET",
					dataType: "JSON"
				}).then((agent) => {
					let agentResponse = agent.agent,
						addedAgent = this.store.createRecord("agent", agentResponse);
					resolvedModel.set("agent", addedAgent);
					return addedAgent.save().then(() => {
						return this.checkClientID(params, resolvedModel);
					});
				}).catch((serverRejection) => {
					return this.checkClientID(params, resolvedModel);
					// return Ember.RSVP.reject(serverRejection); // propogate the rejection
				});
			});
		}
		else if (params["brokerage"]) {
			return this.store.find("brokerage", params.brokerage).then((resolvedBrokerage) => {
				resolvedModel.set("brokerage", resolvedBrokerage);
				return this.checkClientID(params, resolvedModel);
			}).catch(() => {
				return ajax({
					url: `${ENV.apiURL}/brokerage/${params.brokerage}`,
					type: "GET",
					dataType: "JSON"
				}).then((brokerage) => {
					if (brokerage["brokerage"]) {
						let createdBrokerage = this.store.createRecord("brokerage", brokerage.brokerage);
						return createdBrokerage.save().then((savedBrokerage) => {
							resolvedModel.set("brokerage", savedBrokerage);
							return resolvedModel.save().then((updatedApplication) => {
								return this.checkClientID(params, updatedApplication);
							});
						});
					}
					return this.checkClientID(params, resolvedModel);
				}).catch(() => {
					return this.setDefaultBrokerage(resolvedModel, params);
				});
			});
		}
		else {
			if (!resolvedModel.get("agent") && !resolvedModel.get("brokerage")) {
				return this.setDefaultBrokerage(resolvedModel, params);
			}
		}
	},
	actions: {
		/*error: function() {
			this._super();
			this.transitionTo("apply");
		},*/
		addEmploymentMaster: function(applicant, isCurrent) {
			console.log(`First triggered add employment`);
			this.addEmployment(applicant, isCurrent);
			console.log(`Triggered add employment master`);
		},
		addApplicantMaster: function() {
			this.addApplicant(this.get("currentModel.coApplicants"), "New Co-Applicant");
		},
		addAddressMaster: function(applicant) {
			let addedAddress = this.store.createRecord("address");
			addedAddress.save().then((savedAddress) => {
				applicant.get("previousAddresses").pushObject(savedAddress);
			});
		},
		removeAddressMaster: function(address) {
			address.destroyRecord();
		},
		removeApplicantMaster: function(coApplicant) {
			let incomeDeleted = coApplicant.get("income").then((incomeRecords) => {
				incomeRecords.forEach((incomeInstance) => {
					if (incomeInstance) {
						incomeInstance.destroyRecord();
					}
				});
			});
			let vehiclesDeleted = coApplicant.get("vehicles").then((vehicleRecords) => {
				vehicleRecords.forEach((vehicle) => {
					vehicle.destroyRecord();
				});
			});
			let addressesDeleted = coApplicant.get("previousAddresses").then((previousAddressRecords) => {
				previousAddressRecords.forEach((address) => {
					address.destroyRecord();
				});
			});
			let propertiesDeleted = coApplicant.get("properties").then((propertyRecords) => {
				propertyRecords.forEach((property) => {
					property.destroyRecord();
				});
			});
			let assetsDeleted = coApplicant.get("assets").then((assetRecords) => {
				assetRecords.forEach((asset) => {
					asset.destroyRecord();
				});
			});
			let employmentDeleted = coApplicant.get("employment").then((employmentRecords) => {
				employmentRecords.forEach((employment) => {
					employment.destroyRecord();
				});
			});
			return Ember.RSVP.all([employmentDeleted, vehiclesDeleted, addressesDeleted, incomeDeleted, propertiesDeleted, assetsDeleted]).then((resolvedPromises) => {
				return coApplicant.save().then((savedCoApplicant) => {return savedCoApplicant.destroyRecord()});
			});
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
			Ember.RSVP.all([employmentCompany, employmentCompanyAddress, employmentIncome]).then((response) => {
				if (employmentCompany.get("content")) {
					employmentCompany.get("content").destroyRecord();
				}
				if (employmentCompanyAddress.get("content")) {
					employmentCompanyAddress.get("content").destroyRecord();
				}
				if (employmentIncome.get("content")) {
					employmentIncome.get("content").destroyRecord();
				}
				employment.destroyRecord();
			});
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
			return Ember.RSVP.all([
				vehicleLoan.save(),
				vehicleAsset.save(),
				addedVehicle.save()
			]);
		},
		removeVehicleMaster: function(vehicle) {
			let vehicleLoan = vehicle.get("loan"),
				vehicleAsset = vehicle.get("asset");
			if (vehicleLoan) {
				vehicleLoan.then((loan) => loan.destroyRecord());
			}
			if (vehicleAsset) {
				vehicleAsset.then((asset) => asset.destroyRecord());
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
				return applicant.save();
			});
		},
		removeLiabilityMaster: function(liability) {
			liability.destroyRecord().then((result) => {
				console.log(`Successfully deleted liability ${result.get("id")}`);
			});
		},
		addIncomeMaster: function(applicant) {
			let addedIncome = this.store.createRecord("income");
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
		saveVehicles: function() {
			var promises = [];
			this.get("currentModel.applicant.vehicles").forEach((vehicle) => {
				// only save vehicle loan when `hasLoan` is set
				if (vehicle.get("loan")) {
					let vehicleLoan = vehicle.get("loan");
					if (vehicle.get("isFinanced")) {
						vehicleLoan.then((loan) => {
							return loan.save();
						});
					}
					else {
						vehicleLoan.then((loan) => {
							// when the vehicle isn't financed, there's no liability
							return loan.destroyRecord();
						})
					}
					promises.push(vehicleLoan);
				}
				if (vehicle.get("asset")) {
					let vehicleAsset = vehicle.get("asset").then((asset) => {
						return asset.save();
					});
					promises.push(vehicleAsset);
				}
				promises.push(vehicle.save());
			});
			return Ember.RSVP.all(promises);
		},
		saveLiabilities: function() {
			this.get("currentModel.applicant.liabilities").forEach((liability) => {
				liability.save();
			});
		},
		saveEmployment: function() {
			this.get("currentModel.applicant.employment").forEach((employment) => {
				if (employment.get("employer")) {
					if (employment.get("employer.address")) {
						employment.get("employer.address").then((resolvedCompanyAddress) => resolvedCompanyAddress.save());
					}
				}
				if (employment.get("income")) {
					employment.get("income").then((resolvedIncome) => resolvedIncome.save());
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
				property.get("address").then((address) => {
					return address.save();
				});
				property.get("mortgage").then((mortgage) => {
					return mortgage.save();
				});
				property.get("asset").then((asset) => {
					return asset.save();
				});
				property.save().then((savedProperty) => {
					console.log(`Saved property of ID ${savedProperty.get("id")}`);
				});
			});
		}
	}
});
