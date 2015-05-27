import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "applicant-card",
	applicant: null,
	isPrimaryApplicant: Ember.computed.alias("applicant.isPrimary"),
	classNameBindings: ["isPrimaryApplicant:primary-applicant:co-applicant", ":applicant-card"],
	includeLiabilities: false,
	includeAssets: false,
	includeIncome: false,
	onAddEmployment: null,
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
		"Common-Law",
		"Related Family Member",
		"Other",
		"Parent",
		"Sibling",
		"Child",
		"Grandchild",
		"Grandparent"
	],
	maritalStatusOptions: [
		"Single",
		"Married",
		"Widowed",
		"Separated",
		"Divorced",
		"Common-law",
		"Other"
	],
	actions: {
		removeApplicant: function() {
			this.sendAction("onRemoveApplicant", this.get("applicant"));
		},
		addIncome: function() {
			let store = this.get("targetObject.store"), addedIncome = store.createRecord("income");
			addedIncome.save().then((savedIncome) => {
				this.get("applicant.income").pushObject(savedIncome);
			});
		},
		removeIncome: function(income) {
			income.destroyRecord().then((deletedIncome) => {
				console.log(`Successfully deleted income ${deletedIncome.get("id")}`);
			});
		},
		addEmployment: function() {
			this.sendAction("onAddEmployment", this.get("applicant"));
		},
		removeEmployment: function(employment) {
			this.sendAction("onRemoveEmployment", employment);
		},
		addAddress: function() {
			let store = this.get("targetObject.store"), addedAddress = store.createRecord("address");
			addedAddress.save().then((savedAddress) => {
				this.get("applicant.previousAddresses").pushObject(savedAddress);
			});
		},
		addAsset: function() {
			console.log(`AddAsset on applicant-card called`);
			let store = this.get("targetObject.store"), addedAsset = store.createRecord("asset", {type: null});
			addedAsset.save().then((savedAsset) => {
				this.get("applicant.assets").pushObject(savedAsset);
			});
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
			createdLiability.save().then((savedLiability) => {
				this.get("applicant.liabilities").pushObject(savedLiability);
			});
		}
	}
});
