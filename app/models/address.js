import DS from "ember-data";

export default DS.Model.extend({
	address: DS.attr("string"),
	street: DS.attr("string"),
	postalCode: DS.attr("string"),
	unit: DS.attr("number"),
	province: DS.attr("string")
});
