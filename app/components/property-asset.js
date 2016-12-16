import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  classNameBindings: [':property-asset-instance', 'hasMortgage', 'hasLineOfCredit'],
  hasMortgage: computed.bool('property.mortgage'),
  property: null,
  hasLineOfCredit: false, /* Specifically not bound to model to allow for default disabled */
  addressType: null
});
