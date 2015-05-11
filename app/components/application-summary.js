import Ember from "ember";

export default Ember.Component.extend({
	tagName: "application-summary",
	classNameBindings: [":application-summary", "hasApplicants", "hasCoApplicants"],
	application: null,
	onAddApplicant: null,
	onRemoveApplicant: null,
	onAddIncome: null,
	onRemoveIncome: null,
	onAddAsset: null,
	onRemoveAsset: null,
	onAddLiability: null,
	onRemoveLiability: null,
	hasApplicants: Ember.computed.alias("application.applicants.length"),
	hasCoApplicants: Ember.computed.alias("application.coApplicants.length"),
	actions: {
		addApplicant: function() {
			this.sendAction("onAddApplicant");
		},
		removeApplicant: function(applicant) {
			this.sendAction("onRemoveApplicant", applicant);
		},
		addIncome: function() {
			this.sendAction("onAddIncome");
		},
		removeIncome: function(income) {
			this.sendAction("onRemoveIncome", income);
		},
		addAsset: function() {
			this.sendAction("onAddAsset");
		},
		removeAsset: function(asset) {
			this.sendAction("onRemoveAsset", asset);
		},
		addLiability: function() {
			this.sendAction("onAddLiability");
		},
		removeLiability: function(liability) {
			this.sendAction("onRemoveLiability", liability);
		}
	}
});
