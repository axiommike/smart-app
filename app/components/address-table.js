import Ember from 'ember';
const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  addresses: [],
  currentAddress: null,
  person_id: null,
  didReceiveAttrs() {
    if (this.addresses.length >= 1) {
      this.set('currentAddress', this.addresses[0]);
    } else {
      this.set('currentAddress', this.get('store').createRecord('address', {
        person_id: this.get('person_id')
      }));
    }
  },
  actions: {
    addAddress() {
      this.get('addresses').pushObject(this.get('store').createRecord('address', {
        person_id: this.get('person_id')
      }));
    },
    removeAddress(element) {
      this.get('addresses').removeObject(element);
    }
  }
});
