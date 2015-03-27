import DS from "ember-data";

export default DS.Model.extend({
	person: DS.belongsTo("person", {embedded: "always"}),
	liabilities: DS.hasMany("liability"),
	assets: DS.hasMany("assets"),
	properties: Ember.computed.alias("mortgages.@each.property")
});
