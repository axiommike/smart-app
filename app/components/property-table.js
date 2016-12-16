import Ember from 'ember';
const { A, Component, computed } = Ember;

export default Component.extend({
  tagName: 'property-table',
  classNameBindings: [':property-table', 'hasProperties'],
  summary: null,
  caption: null,
  properties: A(),
  property: null, /* A single property, meaning an array wasn't passed in */
  addressType: null,
  hasProperties: computed.notEmpty('properties'),
  propertyCount: computed.alias('properties.length'),
  totalValue: function() {
    // let assets = this.get('properties');
    return 0;
  }.property('properties.@each.value'),
  onAdd: null,
  onRemove: null,
  actions: {
    addProperty() {
      this.sendAction('onAdd');
    },
    removeProperty(property) {
      this.get('properties').removeObject(property);
      this.sendAction('onRemove', property);
    }
  }
});
