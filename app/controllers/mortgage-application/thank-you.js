import Ember from "ember";

export default Ember.Controller.extend({
	actions: {
		completeFulLApp: function() {
			window.location.history.go(-1);
		}
	}
});
