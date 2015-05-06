import Ember from "ember";

export default Ember.Route.extend({
	/**
	 * @@override
	 * Implicitly create a new applicant, redirecting to the generated ID at /mortgage-application/#{id}
	 * @param transition
	 */
	beforeModel: function(transition) {
		var emptyApplicant = this.store.createRecord("applicant",
				{isPrimary: true}
			),
			emptyApplication = this.store.createRecord("application");
		emptyApplication.set("applicant", emptyApplicant);
		emptyApplicant.save().then((savedApplicant) => {
			emptyApplication.save().then((savedApplication) => {
				this.transitionTo("mortgage-application", savedApplication);
			});
		});
	}
});
