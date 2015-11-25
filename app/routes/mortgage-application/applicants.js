import Ember from "ember";

export default Ember.Route.extend({
	titleToken: "Applicants",
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.setProperties({
			currentStep: 1,
			showBreadcrumbs: true,
			hideLegacy: false
		});
	},
	setupController: function (controller, model) {
		// Call _super for default behaviour
		this._super(controller, model);
	}
});
