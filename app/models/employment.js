import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  address: attr('string'),
  country: attr('string'),
  city: attr('string'),
  employer: attr('string'),
  person_id: attr('string'),
  postal_code: attr('string'),
  province: attr('string'),
  occupation: attr('string'),
  tenure_year: attr('string'),
  tenure_month: attr('string'),
  type: attr('string')
});
