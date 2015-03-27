import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		var emptyApplication = this.store.createRecord("application", {});
		var applicant = this.store.createRecord("client");
		var person = this.store.createRecord("person");
		applicant.set("person", person);
		emptyApplication.set("applicant", applicant);
		return emptyApplication;
	}
});
