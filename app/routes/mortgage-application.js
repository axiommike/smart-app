import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		console.log("mortgage application route triggered");
		console.dir(params);
		return this.store.find("application", params.application_id);
	},
	actions: {
		error: function() {
			this.transitionTo("apply");
		}
	}
});
