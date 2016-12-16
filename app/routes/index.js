import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  queryParams: {
    token: {
      refreshModel: true
    }
  },
  intl: service(),
  token: null,
  beforeModel() {
    return this.get('intl').setLocale('en-us');
  },
  model(params) {
    if (params.token) {
      let applicant = this.store.find('applicant', params.token);
      if (applicant) {
        return applicant;
      }
    }

    return this.store.createRecord('applicant', {});
  }
});
