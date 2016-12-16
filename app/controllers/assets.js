import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    addProperty() {
      this.get('model').get('otherProperties').addObject(this.get('store').createRecord('property'));
    },
    addAsset() {
      this.get('model').get('assets').addObject(this.get('store').createRecord('asset'));
    },
    addVehicle() {
      this.get('model').get('vehicles').addObject(this.get('store').createRecord('vehicle'));
    },
    nextStep() {
      let mortgage = this.get('model');
      mortgage.save().then((mortgage) => {
        this.transitionToRoute('liabilities', { queryParams: { id: mortgage.get('id') } });
      });
    }
  }
});
