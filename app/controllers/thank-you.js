import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        completeFullApp: function () {
            window.history.back();
        }
    }
});
