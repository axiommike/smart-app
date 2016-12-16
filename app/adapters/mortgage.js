import ENV from '../config/environment';
import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend({
  host: `${ENV.apiURL}`
});
