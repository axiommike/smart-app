import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        nextStep: function () {
            let mortgage = this.get('model');
            mortgage.save().then((mortgage) => {
                this.transitionToRoute('summary', {queryParams: {id : mortgage.get('id')}});
            });
        }
    }
});
