import Ember from "ember";

export default Ember.Component.extend({
	tagName: "applicant-card",
	applicant: null,
	isPrimaryApplicant: Ember.computed.alias("applicant.isPrimary"),
	classNameBindings: ["isPrimaryApplicant:primary-applicant:co-applicant", ":applicant-card"],
	isEditing: false,
	isEditable: true,
	includeLiabilities: false,
	includeAssets: false,
	includeIncome: false,
	onRemoveApplicant: null,
	onCopyAddresses: null,
	minEmploymentHistory: 3, /* How many years back are required - Expert requires 3 */
	employmentHistoryTimespan: Ember.computed("applicant.employment.@each.tenureTotalYears", function() {
		let employment = this.get("applicant.employment");
		return employment.reduce(function(previousValue, employmentInstance) {
			return previousValue + employmentInstance.get("tenureTotalYears");
		}, 0);
	}),
	previousEmploymentRequired: Ember.computed.lt("employmentHistoryTimespan", "minEmploymentHistory"),
	relationshipTypes: [
		"Spouse",
		"Parent",
		"Child (commonlaw)",
		"Other"
	],
	maritalStatusOptions: [
		{value: "single", label: "Single"},
		{value: "married", label: "Married"},
		{value: "Divorced", label: "Divorced"}
	],
	actions: {
		toggleEditing: function() {
			this.toggleProperty("isEditing");
		},
		removeApplicant: function() {
			this.sendAction("onRemoveApplicant", this.get("applicant"));
		},
		addIncome: function() {
			let store = this.get("targetObject.store"), addedIncome = store.createRecord("income");
			this.get("applicant.income").pushObject(addedIncome);
		},
		removeIncome: function(income) {
			income.destroyRecord().then((deletedIncome) => {
				console.log(`Successfully deleted income ${deletedIncome.get("id")}`);
			});
		},
		addEmployment: function() {
			let store = this.get("targetObject.store"), addedEmployment = store.createRecord("employment"), addedEmploymentCompany = store.createRecord("company"), addedEmploymentCompanyAddress = store.createRecord("address"), addedEmploymentIncome = store.createRecord("income", {type: "employment"});
			addedEmploymentCompany.set("address", addedEmploymentCompanyAddress);
			addedEmployment.setProperties({
				employer: addedEmploymentCompany,
				income: addedEmploymentIncome
			});
			this.get("applicant.income").pushObject(addedEmploymentIncome);
			this.get("applicant.employment").pushObject(addedEmployment);
		},
		removeEmployment: function(employment) {
			let employmentIncome = employment.get("income");
			if (employmentIncome) {
				employmentIncome.destroyRecord();
			}
			employment.destroyRecord().then((deletedEmployment) => {
				console.log(`Successfully deleted employment ${deletedEmployment.get("id")}`);
			});
		},
		addAddress: function() {
			let store = this.get("targetObject.store"), addedAddress = store.createRecord("address");
			this.get("applicant").get("previousAddresses").pushObject(addedAddress);
		},
		addAsset: function() {
			console.log(`AddAsset on applicant-card called`);
			let store = this.get("targetObject.store"), addedAsset = store.createRecord("asset", {type: null});
			this.get("applicant").get("assets").pushObject(addedAsset);
		},
		copyAddresses: function() {
			this.sendAction("onCopyAddresses", this.get("applicant"));
		},
		removeAsset: function(asset) {
			asset.destroyRecord().then((deletedAsset) => {
				console.log(`Successfully deleted asset ${deletedAsset.get("id")}`);
			});
		},
		addLiability: function(type) {
			let store = this.get("targetObject.store"), createdLiability = store.createRecord("liability");
			if (type) {
				createdLiability.set("type", type);
			}
			this.get("applicant.liabilities").pushObject(createdLiability);
		}
	}
});
