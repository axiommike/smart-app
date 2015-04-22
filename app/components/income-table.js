import Ember from "ember";

export default Ember.Component.extend({
	income: Ember.A(),
	onRemove: null,
	onAdd: null,
	actions: {
		addIncome: function() {
			this.sendAction("onAdd");
		},
		removeIncome: function(income) {
			this.sendAction("onRemove", income);
		}
	}
});
