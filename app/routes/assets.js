import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		return this.modelFor("application")
	},
	beforeModel: function() {
		let currentProperty = this.store.createRecord("property");
		currentProperty.set("isCurrent", true);
		let controller = this.controllerFor("assets");
		controller.set("currentProperty", currentProperty);
	}
});
