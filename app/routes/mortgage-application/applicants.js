import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.set("currentStep", 1);
	},
	setupController: function (controller, model) {
		// Call _super for default behaviour
		this._super(controller, model);
	}
});
