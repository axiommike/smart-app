import Ember from "ember";

export default Ember.Mixin.create({
	isEditing: Ember.computed.not("isEditable"),
	isEditable: false,
	actions: {
		toggleEditing: function() {
			this.toggleProperty("isEditing");
		}
	}
});
