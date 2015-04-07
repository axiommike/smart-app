import DS from "ember-data";

export default DS.Model.extend({
	type: DS.attr("string"), /* If a second home, then no rental! */
	valueType: DS.attr("string"),
	ownership: DS.attr("string"),
	value: DS.attr("number", {defaultValue: 0}),
	applicant: DS.belongsTo("applicant")
});
