import Ember from "ember";

export default Ember.Component.extend({
	tagName: "income-table",
	/**
	 * @property {Ember.ArrayProxy} excluded any income to exclude
	 */
	excluded: Ember.A(),
	income: Ember.A(),
	filteredIncome: Ember.computed.setDiff("income", "excluded"),
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
