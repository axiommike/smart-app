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
