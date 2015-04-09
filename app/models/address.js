import DS from "ember-data";
import TimeableMixin from "../mixins/timeable";

export default DS.Model.extend(TimeableMixin, {
	address: DS.attr("string"),
	street: DS.attr("string"),
	postalCode: DS.attr("string"),
	unit: DS.attr("number"),
	province: DS.attr("string"),
	country: DS.attr("string"),
	city: DS.attr("string"),
	region: DS.attr("string")
});
