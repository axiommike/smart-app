import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function() {
		let params = this.paramsFor("default");
		this.transitionTo("apply", {queryParams: params});
	}
});
