import DS from 'ember-data';

export default DS.Model.extend({
    address: DS.attr('string'),
    city: DS.attr('string'),
    country: DS.attr('string'),
    province: DS.attr('string'),
    postal_code: DS.attr('string'),
    is_current: DS.attr('string'),
    person_id: DS.attr('string'),
    url: DS.attr('string'),
    tenure_year: DS.attr('string'),
    tenure_month: DS.attr('string')
});
