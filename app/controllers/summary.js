import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    nextStep() {
      let mortgage = this.get('model');
      mortgage.save().then((mortgage) => {
        this.transitionToRoute('thank-you', { queryParams: { id: mortgage.get('id'), is_incomplete: false } });
      });
    }
  }
});
