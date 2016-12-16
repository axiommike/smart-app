import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    addLiability() {
      this.get('model').get('liabilities').addObject(this.get('store').createRecord('liability'));
    },
    nextStep() {
      let mortgage = this.get('model');
      mortgage.save().then((mortgage) => {
        this.transitionToRoute('summary', { queryParams: { id: mortgage.get('id') } });
      });
    }
  }
});
