import Ember from "ember";

export default Ember.Route.extend({
	/**
	 * @@override
	 * Implicitly create a new applicant, redirecting to the generated ID at /mortgage-application/#{id}
	 * @param transition
	 */
	beforeModel: function(transition) {
		let applicantPrimaryAddress = this.store.createRecord("address",
				{isCurrent: true}
			),
			applicantCurrentPropertyMortgage = this.store.createRecord("liability", {type: "mortgage"}),
			applicantCurrentProperty = this.store.createRecord("property",
				{
					isCurrent: true,
					address: applicantPrimaryAddress,
					mortgage: applicantCurrentPropertyMortgage
				}),
			emptyApplicant = this.store.createRecord("applicant",
				{isPrimary: true}
			),
			emptyApplication = this.store.createRecord("application");
			console.log(`About to set the mortgage of property ${applicantCurrentProperty.get("id")} to ${applicantCurrentPropertyMortgage.get("id")}`);
		emptyApplicant.get("properties").pushObject(applicantCurrentProperty);
		emptyApplication.set("applicant", emptyApplicant);
		this.transitionTo("mortgage-application", emptyApplication);
	}
});
