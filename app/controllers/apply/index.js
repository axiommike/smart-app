import Ember from "ember";

export default Ember.ObjectController.extend({
	actions: {
		nextStep: function() {
			this.get("model.client.person").save().then((person) => {
				// create new application
				this.get("model.client").save().then((client) => {
					this.get("model").set("client", client);
					this.get("model").save().then((application) => {
						application.set("client.person", person);
						this.transitionToRoute("apply.basic-information", application);
					});
				});
			});
		}
	}
});
