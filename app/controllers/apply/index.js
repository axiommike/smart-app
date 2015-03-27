import Ember from "ember";

export default Ember.ObjectController.extend({
	actions: {
		nextStep: function() {
			this.get("model.applicant.person").save().then((clientID) => {
				this.transitionToRoute("apply.basic-information", clientID);
			});
		}
	}
});
