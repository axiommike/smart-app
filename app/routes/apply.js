import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		let xApplicant = this.store.createRecord("applicant"),
			xProperty = this.store.createRecord("property");
		xApplicant.get("properties").pushObject(xProperty);
		return xApplicant;
	}
});
