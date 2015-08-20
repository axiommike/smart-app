import Ember from "ember";

export default Ember.Route.extend({
	queryParams: {
		agent: {
			refreshModel: true
		},
		cid: {
			refreshModel: true
		},
		brokerage: {
			refreshModel: true
		}
	},
	addEmployment: function(applicant, isCurrent) {
		isCurrent = isCurrent ? true : false;
		let createdEmployment = this.store.createRecord("employment", {isCurrent: isCurrent}),
			createdEmploymentAddress = this.store.createRecord("address"),
			createdEmploymentIncome = this.store.createRecord("income", {source: "employment"}),
			createdEmploymentCompany = this.store.createRecord("company", {address: createdEmploymentAddress});
		createdEmployment.setProperties({
			employer: createdEmploymentCompany,
			income: createdEmploymentIncome
		});
		applicant.get("income").pushObject(createdEmploymentIncome);
		applicant.get("employment").pushObject(createdEmployment); // this somehow triggers the "addEmployment" action again
		return Ember.RSVP.all([
			createdEmploymentAddress.save(),
			createdEmploymentIncome.save(),
			createdEmploymentCompany.save(),
			createdEmployment.save()
		]);
	},
	addProperty: function(applicant, isCurrent) {
		let addedProperty = this.store.createRecord("property", {isCurrent: isCurrent}),
			addedPropertyMortgage = this.store.createRecord("liability", {type: "mortgage"}),
			addedPropertyAddress = this.store.createRecord("address", {isCurrent: isCurrent}),
			addedPropertyAsset = this.store.createRecord("asset", {type: "property"}),
			addedPropertyLineOfCredit = this.store.createRecord("liability", {type: "mortgage"});
		addedProperty.setProperties({
			mortgage: addedPropertyMortgage,
			lineOfCredit: addedPropertyLineOfCredit,
			address: addedPropertyAddress,
			asset: addedPropertyAsset
		});
		applicant.get("liabilities").pushObject(addedPropertyMortgage);
		applicant.get("liabilities").pushObject(addedPropertyLineOfCredit);
		applicant.get("assets").pushObject(addedPropertyAsset);
		applicant.get("properties").pushObject(addedProperty);
		if (!isCurrent) {
			applicant.get("previousAddresses").pushObject(addedPropertyAddress);
		}
		// save all these
		return Ember.RSVP.all([
			addedPropertyAsset.save(),
			addedPropertyAddress.save(),
			addedPropertyMortgage.save(),
			addedPropertyLineOfCredit.save(),
			addedProperty.save()
		]);
	},
	addApplicant: function (isPrimary) {
		let addedApplicant = this.store.createRecord("applicant", {isPrimary: isPrimary});
		return Ember.RSVP.all([
			this.addProperty(addedApplicant, true),
			this.addEmployment(addedApplicant, true)
		]).then((propertyPromise, employmentPromise) => {
			return addedApplicant.save().then((resolvedApplicant) => {
				return resolvedApplicant;
			});
		}).catch(() => {
			return Ember.RSVP.reject("Sorry, but we couldn't create a new application for you.  Please try again later.")
		});
	},
	/**
	 * @@override
	 * Implicitly create a new applicant, redirecting to the generated ID at /mortgage-application/#{id}
	 * @param transition
	 */
	beforeModel: function(transition) {
		let primaryApplicantPromise = this.addApplicant(true),
			emptyApplication = this.store.createRecord("application"),
			params = this.paramsFor("apply");
		if (!params.agent && !params.brokerage) {
			params.brokerage = 2;
		}
		return primaryApplicantPromise.then((primaryApplicant) => {
			emptyApplication.set("applicant", primaryApplicant);
			return emptyApplication.save().then((savedApplication) => {
				this.transitionTo("mortgage-application", savedApplication, {queryParams: params});
			});
		});
	}
});
