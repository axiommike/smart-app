import DS from 'ember-data';

export default DS.Model.extend({
    person_id: DS.attr('string'),
    occupation: DS.attr('string'),
    employer: DS.attr('string'),
    type: DS.attr('string'),
    tenure_year: DS.attr('string'),
    tenure_month: DS.attr('string'),
    address: DS.attr('string')
});
