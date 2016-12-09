import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        id: {
            refreshModel: true
        },
        is_incomplete: {
            refreshModel: true
        }
    },
    model(params) {
        if (params.is_incomplete) {
            return this.store.find('applicant', params.id);
        } else {
            return this.store.find('mortgage', params.id);
        }
    }
});
