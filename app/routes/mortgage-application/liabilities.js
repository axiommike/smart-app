import Ember from "ember";

export default Ember.Route.extend({
	titleToken: "Liabilities",
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.setProperties({
			currentStep: 3,
			showBreadcrumbs: true,
			hideLegacy: false
		});
	}
});
