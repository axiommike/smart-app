import DS from "ember-data";

export default DS.Model.extend({
	type: DS.attr("string"),
	valueType: DS.attr("string"),
	ownership: DS.attr("string"),
	value: DS.attr("number", {defaultValue: 0}),
	applicant: DS.belongsTo("applicant"),
	isCurrent: DS.attr("boolean", {defaultValue: false}) /* That the house is currently being lived in by the applicant */
});
