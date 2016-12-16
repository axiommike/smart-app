import Ember from 'ember';
const { Controller, Logger: { log } } = Ember;

export default Controller.extend({
  actions: {
    addApplicant() {
      this.get('model').get('applicants').addObject(this.get('store').createRecord('applicant'));
    },
    removeApplicant(model) {
      this.get('model').get('applicants').removeObject(model);
    },
    copyAddresses(/* model */) {
      let applicants = this.get('model').get('applicants');
      for (let applicant in applicants) {
        log(applicant);
      }
    },
    nextStep() {
      let mortgage = this.get('model');
      mortgage.save().then((mortgage) => {
        this.transitionToRoute('assets', { queryParams: { id: mortgage.get('id') } });
      });
    }
  }
});
