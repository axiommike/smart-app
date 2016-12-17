import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  frequency: attr('string', { defaultValue: 'yearly' }),
  income_source: attr('string'),
  pension_source: attr('string'),
  person_id: attr('string'),
  value: attr('number')
});
