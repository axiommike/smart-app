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
	onAddIncome: null,
	onRemoveIncome: null,
	onAddEmployment: null,
	onRemoveApplicant: null,
	onCopyAddresses: null,
	onAddAddress: null,
	onAddAsset: null,
	onRemoveAsset: null,
	onAddLiability: null,
	onRemoveLiability: null,
	youngestApplicantAge: `${new Date().getFullYear() - 18}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`,
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
			this.sendAction("onAddIncome", this.get("applicant"));
		},
		removeIncome: function(income) {
			this.sendAction("onRemoveIncome", income);
		},
		addEmployment: function() {
			this.sendAction("onAddEmployment", this.get("applicant"));
		},
		removeEmployment: function(employment) {
			this.sendAction("onRemoveEmployment", employment);
		},
		addAddress: function() {
			this.sendAction("onAddAddress", this.get("applicant"));
		},
		addAsset: function() {
			this.sendAction("onAddAsset", this.get("applicant"));
		},
		copyAddresses: function() {
			this.sendAction("onCopyAddresses", this.get("applicant"));
		},
		removeAsset: function(asset) {
			this.sendAction("onRemoveAsset", asset);
		},
		addLiability: function(type) {
			this.sendAction("addLiability", type, this.get("applicant"));
		}
	}
});
