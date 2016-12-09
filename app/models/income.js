import DS from 'ember-data';

export default DS.Model.extend({
    income_source: DS.attr('string'),
    pension_source: DS.attr('string'),
    person_id: DS.attr('string'),
    value: DS.attr('integer'),
    monthly_value: DS.attr('integer'),
    yearly_value: DS.attr('integer')
});
