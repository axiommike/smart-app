import Ember from "ember";

export default Ember.Route.extend({
	titleToken: "Basic Information",
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.setProperties({
			currentStep: 0,
			showBreadcrumbs: false
		});
	}
});
