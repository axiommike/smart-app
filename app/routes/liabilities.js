import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  queryParams: {
    id: {
      refreshModel: true
    }
  },
  model(params) {
    return this.store.find('mortgage', params.id);
  }
});
