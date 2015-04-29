import Ember from "ember";

export default Ember.Component.extend({
	tagName: "income-table",
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
