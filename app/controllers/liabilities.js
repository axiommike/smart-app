import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        addLiability() {
            this.get('model').get('liabilities').addObject(this.get('store').createRecord('liability'));
        },
        nextStep: function () {
            let mortgage = this.get('model');
            mortgage.save().then((mortgage) => {
                this.transitionToRoute('summary', {queryParams: {id : mortgage.get('id')}});
            });
        }
    }
});
