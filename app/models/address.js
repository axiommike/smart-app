import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  address: attr('string'),
  city: attr('string'),
  country: attr('string'),
  province: attr('string'),
  postal_code: attr('string'),
  is_current: attr('string'),
  person_id: attr('string'),
  url: attr('string'),
  tenure_year: attr('string'),
  tenure_month: attr('string')
});
