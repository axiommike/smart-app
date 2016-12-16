import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  income_source: attr('string'),
  pension_source: attr('string'),
  person_id: attr('string'),
  value: attr('integer'),
  monthly_value: attr('integer'),
  yearly_value: attr('integer')
});
