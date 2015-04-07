import Ember from "ember";

export default Ember.Component.extend({
	content: Ember.A(),
	label: null,
	labelID: function() {
		return this.$().parentView.id;
	}.on("didInsertElement")
});
