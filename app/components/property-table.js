import Ember from "ember";

export default Ember.Component.extend({
    tagName: "property-table",
    classNameBindings: [":property-table", "hasProperties"],
    summary: null,
    caption: null,
    properties: Ember.A(),
    property: null, /* A single property, meaning an array wasn't passed in */
    addressType: null,
    hasProperties: Ember.computed.notEmpty("properties"),
    propertyCount: Ember.computed.alias("properties.length"),
    totalValue: function() {
        let assets = this.get("properties");
        return 0;
    }.property("properties.@each.value"),
    onAdd: null,
    onRemove: null,
    actions: {
        addProperty: function() {
            this.sendAction("onAdd");
        },
        removeProperty: function(property) {
            this.get("properties").removeObject(property);
            this.sendAction("onRemove", property);
        }
    }
});
