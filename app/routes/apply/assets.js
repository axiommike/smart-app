import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function() {
		let currentProperty = this.store.createRecord("property");
		currentProperty.set("isCurrent", true);
		let controller = this.controllerFor("apply.assets");
		controller.set("currentProperty", currentProperty);
	}
});
