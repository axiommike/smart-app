import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "income-table",
	flatList: false,
	/**
	 * @property {Ember.ArrayProxy} excluded any income to exclude
	 */
	excluded: Ember.A(),
	income: Ember.A(),
	totalIncome: Ember.computed("filteredIncome.@each.value", function() {
		let income = this.get("filteredIncome");
		return income.reduce(function(previousValue, income) {
			return previousValue + parseInt(income.get("yearlyValue"));
		}, 0);
	}),
	showApplicant: true,
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
