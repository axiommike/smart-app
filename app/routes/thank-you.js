import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
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
