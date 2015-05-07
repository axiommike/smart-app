import DS from "ember-data";

export default DS.Model.extend({
	name: DS.attr("string"),
	description: DS.attr("string"),
	address: DS.belongsTo("address", {async: true}),
	phone: DS.attr("string"),
	fax: DS.attr("string")
});
