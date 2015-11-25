import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	asset: DS.belongsTo("asset", {async: true}),
	loan: DS.belongsTo("liability", {async: true}),
	isFinanced: DS.attr("boolean", {defaultValue: false}), /* This previously resided in the component logic, but has been moved here to allow filtering by financed vehicles */
	make: DS.attr("string"),
	model: DS.attr("string"),
	year: DS.attr("number", {defaultValue: new Date().getFullYear()}),
	applicant: DS.belongsTo("applicant")
});
