import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  person_id: attr('string'),
  occupation: attr('string'),
  employer: attr('string'),
  type: attr('string'),
  tenure_year: attr('string'),
  tenure_month: attr('string'),
  address: attr('string'),
  city: attr('string'),
  country: attr('string'),
  province: attr('string'),
  postal_code: attr('string')
});
