import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application");
		mortgageController.set("currentStep", 2);
	}
});
