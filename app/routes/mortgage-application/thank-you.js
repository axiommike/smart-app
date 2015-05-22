import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Route.extend({
	serializeApplicant: function(applicant) {
		let applicantJSON = applicant.toJSON();
		if (applicant.get("addresses.length")) {
			let applicantAddresses = [];
			applicant.get("addresses").forEach((address) => {
				applicantAddresses.push(address.toJSON());
			});
			applicantJSON.addresses = applicantAddresses;
		}
		if (applicant.get("employment.length")) {
			let applicantEmployment = [];
			applicant.get("employment").forEach((employment) => {
				let employmentJSON = employment.toJSON();
				if (employment.get("employer")) {
					let employmentCompany = employment.get("employer").toJSON();
					if (employment.get("employer.address")) {
						employmentCompany.address = employment.get("employer.address").content.toJSON();
					}
					employmentJSON.employer = employmentCompany;
				}
				if (employment.get("income")) {
					employmentJSON.income = employment.get("income").toJSON();
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
				applicantVehicles.push(vehicle.toJSON());
			});
			applicantJSON.vehicles = applicantVehicles;
		}
		return applicantJSON;
	},
	setupController: function (controller, model) {
		// Call _super for default behaviour
		this._super(controller, model);
		// send JSON to server
		if (model) {
			let nestedJSON = model.toJSON();
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
			let apiRequest = new Ember.RSVP.Promise((resolve, reject) => {
				return ajax({
					type: "PUT",
					/*url: "http://dev.myaxiom.ca/api/application",*/
					url: "http://localhost:81/axiom-api/public/examples/application",
					data: nestedJSON,
					dataType: "json"
				});
			});
		}
	},
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.set("currentStep", 5);
	}
});
