import Ember from "ember";

export default Ember.Component.extend({
	tagName: "applicant-card",
	applicant: null,
	isPrimaryApplicant: Ember.computed.alias("applicant.isPrimary"),
	classNameBindings: ["isPrimaryApplicant:primary-applicant:co-applicant", ":applicant-card"],
	isEditing: false,
	isEditable: true,
	onRemoveApplicant: null,
	actions: {
		toggleEditing: function() {
			this.toggleProperty("isEditing");
		},
		removeApplicant: function() {
			this.sendAction("onRemoveApplicant", this.get("applicant"));
		},
		addEmployment: function() {
			let store = this.get("targetObject.store"), addedEmployment = store.createRecord("employment"), addedEmploymentCompany = store.createRecord("company"), addedEmploymentCompanyAddress = store.createRecord("address");
			addedEmploymentCompany.set("address", addedEmploymentCompanyAddress);
			addedEmployment.set("employer", addedEmploymentCompany);
			this.get("applicant").get("employment").pushObject(addedEmployment);
		},
		removeEmployment: function(employment) {
			this.get("applicant.employment").removeObject(employment);
		},
		addAsset: function() {
			let store = this.get("targetObject.store"), addedAsset = store.createRecord("asset");
			this.get("applicant").get("assets").pushObject(addedAsset);
		},
		removeAsset: function(asset) {
			this.get("applicant.assets").removeObject(asset);
		}
	}
});
