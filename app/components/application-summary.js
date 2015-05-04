import Ember from "ember";

export default Ember.Component.extend({
	tagName: "application-summary",
	classNameBindings: [":application-summary", "hasApplicants", "hasCoApplicants"],
	application: null,
	onAddApplicant: null,
	hasApplicants: Ember.computed.alias("application.applicants.length"),
	hasCoApplicants: Ember.computed.alias("application.coApplicants.length"),
	actions: {
		addApplicant: function() {
			this.sendAction("onAddApplicant");
		}
	}
});
