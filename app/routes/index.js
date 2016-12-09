import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        token: {
            refreshModel: true
        }
    },
    intl: Ember.inject.service(),
    token: null,
    beforeModel() {
        return this.get('intl').setLocale('en-us');
    },
    model(params) {
        if (params.token) {
            return this.store.find('applicant', params.token);
        } else {
            return this.store.createRecord('applicant', {});
        }
    }
});