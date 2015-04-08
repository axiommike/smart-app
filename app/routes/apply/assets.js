import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function() {
		let currentProperty = this.store.createRecord("property"), currentPropertyMortgage = this.store.createRecord("liability", {type: "mortgage"});
		currentProperty.setProperties(
			{
				isCurrent: true,
				valueType: "estimated", /* No one ever gets their properties appraised, right? */
				mortgage: currentPropertyMortgage
			});
		let controller = this.controllerFor("apply.assets");
		controller.set("currentProperty", currentProperty);
	}
});
