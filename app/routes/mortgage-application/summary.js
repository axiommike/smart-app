import Ember from "ember";

export default Ember.Route.extend({
	titleToken: "Summary",
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.setProperties({
			currentStep: 4,
			showBreadcrumbs: true
		});
	}
});
