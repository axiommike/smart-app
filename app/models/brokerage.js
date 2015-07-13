import DS from "ember-data";

export default DS.Model.extend({
	name: DS.attr("string"),
	biography: DS.attr("string"),
	slogan: DS.attr("string"),
	phone: DS.attr("string"),
	address: DS.attr(),
	image: DS.attr("string"),
	website: DS.attr("string"),
	isDefault: DS.attr("boolean")
});
