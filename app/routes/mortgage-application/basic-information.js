import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.set("currentStep", 0);
	},
	setupController: function (controller, model) {
		// Call _super for default behavior
		this._super(controller, model);
		if (model.get("coApplicants.length")) {
			console.log("There were co-applicants");
			controller.set("coApplicantCount", model.get("coApplicants.length"));
		}
	}
});
