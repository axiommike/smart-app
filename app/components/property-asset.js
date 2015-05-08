import Ember from "ember";

export default Ember.Component.extend({
	hasMortgage: Ember.computed.oneWay("property.mortgage"),
	property: null,
	hasLineOfCredit: false
});
