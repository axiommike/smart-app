import Ember from 'ember';
const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  address: null,
  removable: false,
  actions: {
    changeAddress(params) {
      let address = this.get('address');
      address.set('url', params.url);
      for (let i = 0; i < params.address_components.length; i++) {
        let obj = params.address_components[i];
        switch (obj.types[0]) {
          case 'locality':
            address.set('city', obj.long_name);
            break;
          case 'administrative_area_level_1':
            address.set('province', obj.short_name);
            break;
          case 'country':
            address.set('country', obj.short_name);
            break;
          case 'postalCode':
            address.set('postal_code', obj.long_name);
            break;
        }
      }
    },
    remove() {
      let value = this.get('address');
      this.sendAction('removeAddress', value);
    }
  }
});
