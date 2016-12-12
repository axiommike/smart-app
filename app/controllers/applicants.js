import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        addApplicant() {
            this.get('model').get('applicants').addObject(this.get('store').createRecord('applicant'));
        },
        removeApplicant(model) {
            this.get('model').get('applicants').removeObject(model);
        },
        copyAddresses(model) {
            let applicants = this.get('model').get('applicants');
            for (let applicant in applicants) {
                console.log(applicant);
            }
        },
        nextStep: function () {
            let mortgage = this.get('model');
            mortgage.save().then((mortgage) => {
                this.transitionToRoute('assets', {queryParams: {id : mortgage.get('id')}});
            });
        }
    }
});
