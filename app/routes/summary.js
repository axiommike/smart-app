import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        id: {
            refreshModel: true
        }
    },
    model(params) {
        return this.store.find('mortgage', params.id);
    }
});
