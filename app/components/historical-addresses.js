import Ember from "ember";

export default Ember.Component.extend({
    store: Ember.inject.service(),
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
        changeAddress: function (params) {
            let address = this.get('currentAddress');
            address.set('url', params.url);
            for (let i=0; i< params.address_components.length; i++) {
                let obj = params.address_components[i];
                switch(obj.types[0]) {
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
        }
    }
});
