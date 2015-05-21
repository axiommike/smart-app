import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function() {
		let mortgageController = this.controllerFor("mortgage-application.index");
		mortgageController.set("currentStep", 0);
	}
});
