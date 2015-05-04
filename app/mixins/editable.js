import Ember from "ember";

export default Ember.Mixin.create({
	isEditing: false,
	isEditable: true,
	actions: {
		toggleEditing: function() {
			this.toggleProperty("isEditing");
		}
	}
});
